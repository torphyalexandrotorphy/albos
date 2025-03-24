import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  CreditCard,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

// سيتم استبدال هذه البيانات بالبيانات الفعلية من قاعدة البيانات
const visaCards = [
  {
    id: 1,
    type: "فيزا بلاتينيوم",
    number: "**** **** **** ****",
    expiryDate: "05/2029",
    cvv: "123",
    cardHolder: "اسم العميل",
    balance: "0 د.ج",
    limit: "0 د.ج",
    status: "نشطة",
    color: "bg-gradient-to-r from-primary to-primary/60",
  },
];

// سيتم استبدال هذه البيانات بالبيانات الفعلية من قاعدة البيانات
const recentTransactions = [];

export default function VisaCard() {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(visaCards[0]);
  const [isActivated, setIsActivated] = useState(false);
  const [showDetailsButton, setShowDetailsButton] = useState(false);
  const [activeCardType, setActiveCardType] = useState("virtual"); // virtual or physical

  const activateCard = async () => {
    setIsActivated(true);
    setShowDetailsButton(true);
    // جلب بيانات العميل من قاعدة البيانات
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: customerData } = await supabase
          .from("customers")
          .select("first_name, last_name")
          .eq("user_id", user.id)
          .single();

        if (customerData) {
          const fullName = `${customerData.first_name} ${customerData.last_name}`;
          setSelectedCard({
            ...selectedCard,
            number: "4929 1234 5678 9012",
            expiryDate: "05/2029",
            cvv: "123",
            cardHolder: fullName,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      // في حالة الخطأ، استخدم الاسم الافتراضي
      setSelectedCard({
        ...selectedCard,
        number: "4929 1234 5678 9012",
        expiryDate: "05/2029",
        cvv: "123",
        cardHolder: "اسم العميل",
      });
    }
  };

  const toggleCardDetails = () => {
    setShowCardDetails(!showCardDetails);
  };

  const orderPhysicalCard = () => {
    // هنا يمكن إضافة المنطق لطلب البطاقة الفعلية
    alert("تم طلب البطاقة الفعلية بنجاح. سيتم خصم 2 دولار من حسابك.");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">بطاقات الدفع</h2>
        <p className="text-muted-foreground">
          إدارة بطاقاتك الافتراضية والصلبة
        </p>
      </div>

      {/* قسم اختيار نوع البطاقة */}
      <div className="flex justify-center mb-6">
        <div className="bg-muted rounded-lg p-1 flex w-full max-w-md">
          <button
            onClick={() => setActiveCardType("virtual")}
            className={`flex-1 py-2 px-4 rounded-md text-center transition-all ${activeCardType === "virtual" ? "bg-background shadow-sm" : "hover:bg-background/50"}`}
          >
            بطاقة افتراضية
          </button>
          <button
            onClick={() => setActiveCardType("physical")}
            className={`flex-1 py-2 px-4 rounded-md text-center transition-all ${activeCardType === "physical" ? "bg-background shadow-sm" : "hover:bg-background/50"}`}
          >
            بطاقة صلبة
          </button>
        </div>
      </div>

      {/* محتوى البطاقة الافتراضية */}
      {activeCardType === "virtual" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <div className="relative mb-6">
              <Card
                className={`overflow-hidden ${selectedCard.color} text-white border-0 shadow-lg w-full max-w-md mx-auto`}
              >
                <div className="absolute top-4 right-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png"
                    alt="Visa"
                    className="h-10 w-auto"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mt-10 mb-6">
                    <p className="text-sm opacity-80 mb-1">رقم البطاقة</p>
                    <p className="text-xl tracking-wider font-mono">
                      {showCardDetails
                        ? "4929 1234 5678 9012"
                        : selectedCard.number.replace(/[0-9]/g, "*")}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm opacity-80 mb-1">صاحب البطاقة</p>
                      <p>{selectedCard.cardHolder}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-1">تاريخ الانتهاء</p>
                      <p>
                        {showCardDetails ? selectedCard.expiryDate : "**/**"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-1">CVV</p>
                      <p>{showCardDetails ? selectedCard.cvv : "***"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {visaCards.length > 1 && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-background shadow-md"
                    onClick={() => {
                      const currentIndex = visaCards.findIndex(
                        (card) => card.id === selectedCard.id,
                      );
                      const nextIndex = (currentIndex + 1) % visaCards.length;
                      setSelectedCard(visaCards[nextIndex]);
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="mt-6 text-center">
                {!isActivated ? (
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white w-full max-w-xs"
                    onClick={activateCard}
                  >
                    <Lock className="h-4 w-4 ml-2" />
                    تفعيل البطاقة
                  </Button>
                ) : (
                  <div className="space-y-2">
                    {showDetailsButton && (
                      <Button
                        className="bg-primary hover:bg-primary/90 text-white w-full max-w-xs"
                        onClick={toggleCardDetails}
                      >
                        {showCardDetails ? (
                          <>
                            <EyeOff className="h-4 w-4 ml-2" />
                            إخفاء أرقام البطاقة
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 ml-2" />
                            كشف أرقام البطاقة
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <Tabs defaultValue="security" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="security">الأمان</TabsTrigger>
                <TabsTrigger value="limits">الحدود</TabsTrigger>
              </TabsList>

              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الأمان</CardTitle>
                    <CardDescription>
                      تحكم في إعدادات الأمان الخاصة ببطاقتك
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-full ml-4">
                            <Lock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              تجميد البطاقة مؤقتاً
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              إيقاف البطاقة مؤقتاً عن الاستخدام
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">تجميد</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-full ml-4">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">تغيير الرقم السري</h3>
                            <p className="text-sm text-muted-foreground">
                              تحديث الرقم السري للبطاقة
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">تغيير</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="limits" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>حدود الاستخدام</CardTitle>
                    <CardDescription>
                      تعديل حدود السحب والشراء لبطاقتك
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-full ml-4">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">حدود الشراء اليومية</h3>
                            <p className="text-sm text-muted-foreground">
                              تعديل الحد الأقصى للمشتريات اليومية
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">تعديل</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-full ml-4">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">حدود السحب النقدي</h3>
                            <p className="text-sm text-muted-foreground">
                              تعديل الحد الأقصى للسحب النقدي
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">تعديل</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {/* محتوى البطاقة الصلبة */}
      {activeCardType === "physical" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <div className="relative mb-6">
              <Card className="overflow-hidden bg-gradient-to-r from-red-600 to-red-400 text-white border-0 shadow-lg w-full max-w-md mx-auto">
                <div className="absolute top-4 right-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png"
                    alt="Visa"
                    className="h-10 w-auto"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mt-10 mb-6">
                    <p className="text-sm opacity-80 mb-1">رقم البطاقة</p>
                    <p className="text-xl tracking-wider font-mono">
                      **** **** **** ****
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm opacity-80 mb-1">صاحب البطاقة</p>
                      <p>اسم العميل</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-1">تاريخ الانتهاء</p>
                      <p>**/**</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-1">CVV</p>
                      <p>***</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white w-full max-w-xs mx-auto"
                  onClick={orderPhysicalCard}
                >
                  <CreditCard className="h-4 w-4 ml-2" />
                  طلب بطاقة صلبة (2 دولار)
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>معلومات البطاقة الصلبة</CardTitle>
                <CardDescription>
                  احصل على بطاقة فيزا فعلية لاستخدامها في أي مكان
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full ml-4">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">أمان إضافي</h3>
                      <p className="text-sm text-muted-foreground">
                        بطاقة فعلية مع ميزات أمان متقدمة
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full ml-4">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">قبول عالمي</h3>
                      <p className="text-sm text-muted-foreground">
                        مقبولة في جميع أنحاء العالم في الملايين من المتاجر
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full ml-4">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">التوصيل السريع</h3>
                      <p className="text-sm text-muted-foreground">
                        توصيل البطاقة خلال 5-7 أيام عمل
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground w-full text-center">
                  سيتم خصم رسوم إصدار البطاقة (2 دولار) من حسابك عند الطلب
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
