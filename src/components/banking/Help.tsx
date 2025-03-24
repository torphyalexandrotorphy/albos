import { useState, useEffect } from "react";
import { Send, User, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
}

export default function Help() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "مرحباً بك في خدمة الدردشة مع الإدارة. كيف يمكننا مساعدتك اليوم؟",
      sender: "admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ]);

  // إضافة رد تلقائي على رسالة الترحيب عند تحميل الصفحة
  useEffect(() => {
    // تأخير قصير لمحاكاة وقت الاستجابة
    const timer = setTimeout(() => {
      const initialResponse: Message = {
        id: 2,
        text: "يمكنك طرح أي استفسار متعلق بالخدمات المصرفية وسنقوم بالرد عليك في أقرب وقت ممكن.",
        sender: "admin",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, initialResponse]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      const scrollArea = document.querySelector(".scroll-area-viewport");
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate admin response after a short delay
    setTimeout(() => {
      const adminResponses = [
        "شكراً لتواصلك معنا. سيقوم أحد ممثلي خدمة العملاء بالرد عليك قريباً.",
        "نحن نعمل على طلبك ونقدر صبرك.",
        "يمكنك أيضاً الاتصال بنا على الرقم 800-1234 للمساعدة الفورية.",
        "هل هناك أي معلومات إضافية يمكنك تقديمها لمساعدتنا في حل مشكلتك؟",
      ];

      const randomResponse =
        adminResponses[Math.floor(Math.random() * adminResponses.length)];

      const adminMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "admin",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, adminMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 h-full flex flex-col">
      <Card className="w-full h-full flex flex-col bg-white shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground mr-2 md:hidden"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle className="text-lg sm:text-xl font-bold">
              الدردشة مع الإدارة
            </CardTitle>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs sm:text-sm">متصل الآن</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col relative">
          <ScrollArea className="flex-1 p-2 sm:p-4 pb-20 md:pb-4">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-1 sm:gap-2 max-w-[85%] sm:max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar
                      className={`h-6 w-6 sm:h-8 sm:w-8 ${message.sender === "user" ? "bg-primary" : "bg-secondary"}`}
                    >
                      {message.sender === "admin" ? (
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                      ) : null}
                      <AvatarFallback>
                        {message.sender === "user" ? (
                          <User size={isMobile ? 12 : 16} />
                        ) : (
                          "إد"
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-2 sm:p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <p className="text-xs sm:text-sm break-words">
                        {message.text}
                      </p>
                      <p className="text-[10px] sm:text-xs opacity-70 mt-1 text-left">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-2 sm:p-4 border-t fixed bottom-0 left-0 right-0 bg-white z-50 md:static">
            <div className="flex gap-2 max-w-[calc(100%-16px)] mx-auto container">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 text-sm h-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="h-10 px-4 flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">إرسال</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
