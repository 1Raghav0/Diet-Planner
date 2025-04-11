import axios from "axios";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/Firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const DietAssistant = () => {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const chatContainerRef = useRef(null);
  const [hasAutoSuggested, setHasAutoSuggested] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Save conversation to Firestore
  const saveConversationToFirestore = async (questionText, responseText) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "conversations"), {
        userId: user.uid,
        question: questionText,
        response: responseText,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  // ✅ Fetch user's past conversations
  // const fetchUserConversations = async (userId) => {
  //   try {
  //     const q = query(
  //       collection(db, "conversations"),
  //       where("userId", "==", userId),
  //       orderBy("timestamp")
  //     );
  //     const querySnapshot = await getDocs(q);

  //     const userConversations = querySnapshot.docs
  //       .map((doc) => doc.data())
  //       .flatMap((entry) => [
  //         {
  //           text: `👨‍💻 <strong>Question:</strong> ${entry.question}`,
  //           sender: "user",
  //         },
  //         {
  //           text: `🤖 <strong>AI Suggestions:</strong> ${entry.response}`,
  //           sender: "ai",
  //         },
  //       ]);

  //     setConversation(userConversations);
  //   } catch (error) {
  //     console.error("Error fetching conversation:", error);
  //   }
  // };

  // Fetch previous conversations of the user
const fetchUserConversations = async (userId) => {
  try {
    const q = query(
      collection(db, "conversations"),
      where("userId", "==", userId),
      orderBy("timestamp") // If you're using orderBy, this is what needs indexing
    );

    const querySnapshot = await getDocs(q);
    const userConversations = querySnapshot.docs.flatMap((doc) => [
      {
        id: doc.id,
        text: `👨‍💻 <strong>Question:</strong> ${doc.data().question}`,
        sender: "user",
      },
      {
        id: doc.id,
        text: `🤖 <strong>AI Suggestions:</strong> ${doc.data().response}`,
        sender: "ai",
      },
    ]);
    setConversation(userConversations);
  } catch (error) {
    console.error("Error fetching conversation:", error);

    // Show alert if index is still building
    if (error.code === "failed-precondition") {
      alert("Setting things up... Please wait a few moments and refresh. (Firestore index is still being built.)");
    }
  }
};


  // ✅ Analyze diet input using Gemini API
  const analyzeUI = useCallback(
    async (prompt = question) => {
      if (!prompt.trim()) return;

      const userMessage = {
        text: `👨‍💻 <strong>Question:</strong> ${prompt}`,
        sender: "user",
      };
      setConversation((prev) => [...prev, userMessage]);
      setQuestion("");

      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);

      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_GEMINI_API_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: `Analyze this diet, nutritional goals, and food choices:\n${prompt}`,
                  },
                ],
              },
            ],
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const aiResponse =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I'm having trouble responding right now.";

        const aiMessage = {
          text: `🤖 <strong>AI Suggestions:</strong> ${aiResponse}`,
          sender: "ai",
        };
        setConversation((prev) => [...prev, aiMessage]);

        await saveConversationToFirestore(prompt, aiResponse);
      } catch (error) {
        console.error("Error analyzing UI:", error);
        const errorMessage = {
          text: `❌ <strong>Error:</strong> Failed to analyze.`,
          sender: "ai",
        };
        setConversation((prev) => [...prev, errorMessage]);
      }
      setLoading(false);
    },
    [question, user]
  );

  // ✅ Clear user's conversations
  const clearConversations = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "conversations"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      for (const document of querySnapshot.docs) {
        await deleteDoc(doc(db, "conversations", document.id));
      }
      setConversation([]);
      setHasAutoSuggested(true);
      navigate("/dietassistant");
    } catch (error) {
      console.error("Error clearing conversations:", error);
    }
  };

  // ✅ Auth state monitoring
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserConversations(currentUser.uid);
      } else {
        setConversation([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Clear chat if user is logged out
  useEffect(() => {
    if (!user) {
      setConversation([]);
      setHasAutoSuggested(true);
      navigate("/dietassistant");
    }
  }, [user, navigate]);

  // ✅ Auto-suggest based on category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category && conversation.length === 0 && !hasAutoSuggested) {
      const promptMap = {
        underweight:
          "Create a high-calorie, nutrient-rich diet plan for someone who is underweight and provide both options like vegeterian or non-vegeterian.",
        fit:
          "Create a balanced diet plan for someone who is fit and wants to maintain their health and provide both options like vegeterian or non-vegeterian.",
        overweight:
          "Suggest a low-calorie, high-fiber diet for someone who is overweight and provide both options like vegeterian or non-vegeterian.",
        obesity:
          "Provide a medically appropriate weight loss diet plan for someone who is obese and provide both options like vegeterian or non-vegeterian.",
      };

      const questionText = promptMap[category.toLowerCase()];
      if (questionText) {
        analyzeUI(questionText);
        setHasAutoSuggested(true);
      }
    }
  }, [location, analyzeUI, conversation, hasAutoSuggested]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-100 to-lime-100 p-10">
      <div className="w-full max-w-3xl mt-10 bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-300">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-lg font-semibold flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>🥗 NutriWise</span>
            {location.search && (
              <span className="bg-white text-emerald-600 px-2 py-1 rounded text-sm font-medium capitalize">
                Plan for: {new URLSearchParams(location.search).get("category")}
              </span>
            )}
          </div>
          {user && (
            <button
              onClick={clearConversations}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Chat area */}
        <div
          ref={chatContainerRef}
          className="h-[450px] overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gray-50"
        >
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-lg md:max-w-md text-white shadow ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-left"
                    : "bg-gray-800 text-left"
                }`}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br>") }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-emerald-50 border-t border-emerald-200 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-white border border-emerald-300 text-gray-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-500"
            placeholder="Ask about a custom diet plan, food, health goals..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyzeUI()}
          />
          <button
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-700 transition disabled:bg-gray-400"
            onClick={() => analyzeUI()}
            disabled={loading}
          >
            {loading ? "Processing..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietAssistant;