import { useState, useEffect } from "react";
import { customerService } from "@/lib/customers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  ArrowRight,
  Building,
  Wallet,
  CreditCard,
  Send,
  Download,
  Upload,
  ExternalLink,
} from "lucide-react";

const electronicWallets = [
  { id: "wise", name: "Wise" },
  { id: "redotpay", name: "RedotPay" },
  { id: "paysera", name: "Paysera" },
  { id: "paypal", name: "PayPal" },
  { id: "binance", name: "Binance" },
  { id: "revolut", name: "Revolut" },
];

const currencies = [
  { id: "aed", symbol: "د.إ", name: "درهم اماراتي" },
  { id: "eur", symbol: "€", name: "يورو" },
  { id: "usd", symbol: "$", name: "دولار أمريكي" },
  { id: "gbp", symbol: "£", name: "جنيه استرليني" },
];

export default function Transfers() {
  // Removed account selection states
  // const [fromAccount, setFromAccount] = useState("");
  // const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("aed");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-3xl font-bold">التحويلات المالية</h1>
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="deposit" className="text-lg py-3">
            <Download className="ml-2 h-5 w-5" />
            الإيداع
          </TabsTrigger>
          <TabsTrigger value="send" className="text-lg py-3">
            <Upload className="ml-2 h-5 w-5" />
            الإرسال
          </TabsTrigger>
        </TabsList>

        {/* قسم الإيداع */}
        <TabsContent
          value="deposit"
          className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100"
        >
          <Tabs defaultValue="aman-deposit">
            <TabsList className="w-full max-w-md mb-4">
              <TabsTrigger value="aman-deposit" className="flex-1">
                <Building className="ml-2 h-4 w-4" />
                إيداع من بنك الأمان
              </TabsTrigger>
              <TabsTrigger value="other-deposit" className="flex-1">
                <Wallet className="ml-2 h-4 w-4" />
                إيداع من بنوك أخرى
              </TabsTrigger>
            </TabsList>

            {/* إيداع من بنك الأمان */}
            <TabsContent value="aman-deposit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>إيداع من حساب بنك الأمان</CardTitle>
                  <CardDescription>
                    قم بإيداع الأموال من حساب آخر في بنك الأمان
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-4">
                    <h3 className="font-medium text-lg mb-2">
                      تعليمات الإيداع
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      لإيداع الأموال في حسابك، يرجى استخدام المعلومات التالية:
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-background p-3 rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            البريد الإلكتروني
                          </p>
                          <p className="font-medium" id="email-to-copy">
                            ahmed.karim@example.com
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            try {
                              navigator.clipboard.writeText(
                                "ahmed.karim@example.com",
                              );
                            } catch (error) {
                              // Create a temporary textarea element
                              const textarea =
                                document.createElement("textarea");
                              textarea.value = "ahmed.karim@example.com";
                              textarea.style.position = "fixed";
                              document.body.appendChild(textarea);
                              textarea.focus();
                              textarea.select();

                              try {
                                document.execCommand("copy");
                              } catch (e) {
                                console.error(
                                  "Fallback copy method failed:",
                                  e,
                                );
                              }

                              document.body.removeChild(textarea);
                            }
                          }}
                        >
                          <CreditCard className="ml-2 h-4 w-4" />
                          نسخ
                        </Button>
                      </div>

                      <div className="flex items-center justify-between bg-background p-3 rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            رقم الحساب
                          </p>
                          <p className="font-medium" id="account-to-copy">
                            DZ59 1234 5678 9012 3456
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            try {
                              navigator.clipboard.writeText(
                                "DZ59 1234 5678 9012 3456",
                              );
                            } catch (error) {
                              // Create a temporary textarea element
                              const textarea =
                                document.createElement("textarea");
                              textarea.value = "DZ59 1234 5678 9012 3456";
                              textarea.style.position = "fixed";
                              document.body.appendChild(textarea);
                              textarea.focus();
                              textarea.select();

                              try {
                                document.execCommand("copy");
                              } catch (e) {
                                console.error(
                                  "Fallback copy method failed:",
                                  e,
                                );
                              }

                              document.body.removeChild(textarea);
                            }
                          }}
                        >
                          <CreditCard className="ml-2 h-4 w-4" />
                          نسخ
                        </Button>
                      </div>

                      <div className="flex items-center justify-between bg-background p-3 rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            رقم الهاتف
                          </p>
                          <p className="font-medium" id="phone-to-copy">
                            0555123456
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            try {
                              navigator.clipboard.writeText("0555123456");
                            } catch (error) {
                              // Create a temporary textarea element
                              const textarea =
                                document.createElement("textarea");
                              textarea.value = "0555123456";
                              textarea.style.position = "fixed";
                              document.body.appendChild(textarea);
                              textarea.focus();
                              textarea.select();

                              try {
                                document.execCommand("copy");
                              } catch (e) {
                                console.error(
                                  "Fallback copy method failed:",
                                  e,
                                );
                              }

                              document.body.removeChild(textarea);
                            }
                          }}
                        >
                          <CreditCard className="ml-2 h-4 w-4" />
                          نسخ
                        </Button>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4"
                      variant="secondary"
                      onClick={() => {
                        const allInfo = `البريد الإلكتروني: ahmed.karim@example.com\nرقم الحساب: DZ59 1234 5678 9012 3456\nرقم الهاتف: 0555123456`;
                        try {
                          navigator.clipboard.writeText(allInfo);
                        } catch (error) {
                          // Create a temporary textarea element
                          const textarea = document.createElement("textarea");
                          textarea.value = allInfo;
                          textarea.style.position = "fixed";
                          document.body.appendChild(textarea);
                          textarea.focus();
                          textarea.select();

                          try {
                            document.execCommand("copy");
                          } catch (e) {
                            console.error("Fallback copy method failed:", e);
                          }

                          document.body.removeChild(textarea);
                        }
                      }}
                    >
                      <Download className="ml-2 h-4 w-4" />
                      نسخ الكل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* إيداع من بنوك أخرى */}
            <TabsContent value="other-deposit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>إيداع من بنوك أخرى</CardTitle>
                  <CardDescription>
                    قم بإيداع الأموال من بنوك أخرى أو محافظ إلكترونية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wallet-deposit">المحفظة الإلكترونية</Label>
                    <Select
                      value={selectedWallet}
                      onValueChange={setSelectedWallet}
                    >
                      <SelectTrigger id="wallet-deposit">
                        <SelectValue placeholder="اختر المحفظة" />
                      </SelectTrigger>
                      <SelectContent>
                        {electronicWallets.map((wallet) => (
                          <SelectItem key={wallet.id} value={wallet.id}>
                            {wallet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount-other">المبلغ (د.إ)</Label>
                    <Input
                      id="amount-other"
                      type="number"
                      placeholder="أدخل المبلغ"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  {selectedWallet && (
                    <div className="bg-muted p-4 rounded-lg space-y-4 mt-4">
                      <h3 className="font-medium text-lg mb-2">
                        تعليمات الإيداع
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        توجه للبنك المختار وارسل على هذا البريد
                      </p>

                      <div className="flex items-center justify-between bg-background p-3 rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            البريد الإلكتروني
                          </p>
                          <p className="font-medium" id="wallet-email-to-copy">
                            amannabank@bankamana.com
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Create a temporary textarea element for more reliable copying
                            const textarea = document.createElement("textarea");
                            textarea.value = "amannabank@bankamana.com";
                            textarea.style.position = "fixed";
                            textarea.style.opacity = "0";
                            document.body.appendChild(textarea);
                            textarea.focus();
                            textarea.select();

                            try {
                              document.execCommand("copy");
                              // Optional: Show feedback that copy was successful
                              // toast({ description: "تم النسخ بنجاح" });
                            } catch (e) {
                              console.error("Copy failed:", e);
                              // Fallback to clipboard API as last resort
                              try {
                                navigator.clipboard.writeText(
                                  "amannabank@bankamana.com",
                                );
                              } catch (clipboardError) {
                                console.error("All copy methods failed");
                              }
                            } finally {
                              document.body.removeChild(textarea);
                            }
                          }}
                        >
                          <CreditCard className="ml-2 h-4 w-4" />
                          نسخ
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="pt-4"></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>تعليمات الإيداع</CardTitle>
                  <CardDescription>
                    معلومات مهمة للإيداع من بنوك أخرى
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">
                        رقم الحساب المصرفي الدولي (IBAN)
                      </h3>
                      <p className="text-muted-foreground">
                        AE07 0331 2345 6789 1234 567
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">رمز السويفت (SWIFT)</h3>
                      <p className="text-muted-foreground">AMANAEADXXX</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">اسم البنك</h3>
                      <p className="text-muted-foreground">بنك الأمان</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ملاحظة: قد تستغرق التحويلات الدولية من 1-3 أيام عمل لتظهر
                      في حسابك.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* قسم الإرسال */}
        <TabsContent
          value="send"
          className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100"
        >
          <Tabs defaultValue="aman-send">
            <TabsList className="w-full max-w-md mb-4">
              <TabsTrigger value="aman-send" className="flex-1">
                <Building className="ml-2 h-4 w-4" />
                إرسال إلى بنك الأمان
              </TabsTrigger>
              <TabsTrigger value="other-send" className="flex-1">
                <Wallet className="ml-2 h-4 w-4" />
                إرسال إلى بنوك أخرى
              </TabsTrigger>
            </TabsList>

            {/* إرسال إلى بنك الأمان */}
            <TabsContent value="aman-send" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>إرسال إلى حساب بنك الأمان</CardTitle>
                  <CardDescription>
                    قم بإرسال الأموال إلى حساب آخر في بنك الأمان
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
                      {success}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="recipient-account">رقم حساب المستلم</Label>
                    <Input
                      id="recipient-account"
                      placeholder="أدخل رقم حساب المستلم"
                      value={recipientAccount}
                      onChange={(e) => setRecipientAccount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-email">
                      البريد الإلكتروني للمستلم
                    </Label>
                    <Input
                      id="recipient-email"
                      type="email"
                      placeholder="أدخل البريد الإلكتروني للمستلم"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-phone">رقم هاتف المستلم</Label>
                    <Input
                      id="recipient-phone"
                      placeholder="أدخل رقم هاتف المستلم"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-4 rtl:space-x-reverse">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="amount-send">المبلغ</Label>
                      <Input
                        id="amount-send"
                        type="number"
                        placeholder="أدخل المبلغ"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 w-24">
                      <Label htmlFor="currency-select">العملة</Label>
                      <Select
                        value={selectedCurrency}
                        onValueChange={setSelectedCurrency}
                      >
                        <SelectTrigger id="currency-select">
                          <SelectValue placeholder="العملة" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.id} value={currency.id}>
                              {currency.symbol}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        رسوم التحويل:
                      </span>
                      <span className="font-medium">
                        0.30{" "}
                        {currencies.find((c) => c.id === selectedCurrency)
                          ?.symbol || "د.إ"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full"
                      onClick={() => {
                        // Reset previous messages
                        setError("");
                        setSuccess("");

                        // Validate inputs
                        if (!recipientAccount) {
                          setError("يرجى إدخال رقم حساب المستلم");
                          return;
                        }

                        if (!recipientEmail) {
                          setError("يرجى إدخال البريد الإلكتروني للمستلم");
                          return;
                        }

                        if (!recipientPhone) {
                          setError("يرجى إدخال رقم هاتف المستلم");
                          return;
                        }

                        if (!amount || parseFloat(amount) <= 0) {
                          setError("يرجى إدخال مبلغ صحيح");
                          return;
                        }

                        // Process transfer (mock implementation)
                        setTimeout(() => {
                          setSuccess("تم إرسال التحويل بنجاح!");
                          // Reset form
                          setAmount("");
                          setRecipientAccount("");
                          setRecipientEmail("");
                          setRecipientPhone("");
                        }, 1000);
                      }}
                    >
                      <Send className="ml-2 h-4 w-4" />
                      إرسال الأموال
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* إرسال إلى بنوك أخرى */}
            <TabsContent value="other-send" className="space-y-4">
              <Tabs defaultValue="electronic-wallets">
                <TabsList className="w-full max-w-md mb-4">
                  <TabsTrigger value="electronic-wallets" className="flex-1">
                    <Wallet className="ml-2 h-4 w-4" />
                    المحافظ الإلكترونية
                  </TabsTrigger>
                  <TabsTrigger value="manual-input" className="flex-1">
                    <Building className="ml-2 h-4 w-4" />
                    إدخال يدوي
                  </TabsTrigger>
                </TabsList>

                {/* قسم المحافظ الإلكترونية */}
                <TabsContent value="electronic-wallets" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>إرسال إلى محافظ إلكترونية</CardTitle>
                      <CardDescription>
                        قم بإرسال الأموال إلى محافظ إلكترونية
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {error && (
                        <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">
                          {error}
                        </div>
                      )}
                      {success && (
                        <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
                          {success}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="wallet-send">المحفظة الإلكترونية</Label>
                        <Select
                          value={selectedWallet}
                          onValueChange={setSelectedWallet}
                        >
                          <SelectTrigger id="wallet-send">
                            <SelectValue placeholder="اختر المحفظة" />
                          </SelectTrigger>
                          <SelectContent>
                            {electronicWallets.map((wallet) => (
                              <SelectItem key={wallet.id} value={wallet.id}>
                                {wallet.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedWallet && (
                        <div className="space-y-2">
                          <Label htmlFor="wallet-email">
                            البريد الإلكتروني
                          </Label>
                          <Input
                            id="wallet-email"
                            placeholder="أدخل البريد الإلكتروني"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                          />
                        </div>
                      )}

                      <div className="flex space-x-4 rtl:space-x-reverse">
                        <div className="space-y-2 flex-1">
                          <Label htmlFor="amount-wallet-send">المبلغ</Label>
                          <Input
                            id="amount-wallet-send"
                            type="number"
                            placeholder="أدخل المبلغ"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 w-24">
                          <Label htmlFor="currency-wallet-select">العملة</Label>
                          <Select
                            value={selectedCurrency}
                            onValueChange={setSelectedCurrency}
                          >
                            <SelectTrigger id="currency-wallet-select">
                              <SelectValue placeholder="العملة" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem
                                  key={currency.id}
                                  value={currency.id}
                                >
                                  {currency.symbol}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full"
                          onClick={() => {
                            // Reset previous messages
                            setError("");
                            setSuccess("");

                            // Validate inputs
                            if (!selectedWallet) {
                              setError("يرجى اختيار المحفظة الإلكترونية");
                              return;
                            }

                            if (!amount || parseFloat(amount) <= 0) {
                              setError("يرجى إدخال مبلغ صحيح");
                              return;
                            }

                            // Process transfer (mock implementation)
                            setTimeout(() => {
                              setSuccess(
                                "تستغرق مدة الارسال للبنك اخر من دقيقة الى عشر دقائق",
                              );
                              // Reset form
                              setAmount("");
                              setSelectedWallet("");
                            }, 1000);
                          }}
                        >
                          <Send className="ml-2 h-4 w-4" />
                          إرسال الأموال
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* قسم الإدخال اليدوي */}
                <TabsContent value="manual-input" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>إرسال إلى بنوك أخرى</CardTitle>
                      <CardDescription>
                        قم بإرسال الأموال إلى بنوك أخرى عبر ملء الحقول
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient-iban">
                          رقم الآيبان (IBAN)
                        </Label>
                        <Input
                          id="recipient-iban"
                          placeholder="أدخل رقم الآيبان للمستلم"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipient-name-other">
                          اسم المستلم
                        </Label>
                        <Input
                          id="recipient-name-other"
                          placeholder="أدخل اسم المستلم"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipient-bank">اسم البنك</Label>
                        <Input
                          id="recipient-bank"
                          placeholder="أدخل اسم بنك المستلم"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="swift-code">رمز السويفت (SWIFT)</Label>
                        <Input id="swift-code" placeholder="أدخل رمز السويفت" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amount-other-send">المبلغ (د.إ)</Label>
                        <Input
                          id="amount-other-send"
                          type="number"
                          placeholder="أدخل المبلغ"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="purpose-other-send">
                          الغرض من التحويل
                        </Label>
                        <Select>
                          <SelectTrigger id="purpose-other-send">
                            <SelectValue placeholder="اختر الغرض" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="family">دعم عائلي</SelectItem>
                            <SelectItem value="personal">
                              مصاريف شخصية
                            </SelectItem>
                            <SelectItem value="business">
                              أعمال تجارية
                            </SelectItem>
                            <SelectItem value="education">تعليم</SelectItem>
                            <SelectItem value="medical">رعاية صحية</SelectItem>
                            <SelectItem value="other">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-4">
                        <Button className="w-full">
                          <Send className="ml-2 h-4 w-4" />
                          إرسال الأموال
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>رسوم التحويل</CardTitle>
                      <CardDescription>
                        معلومات عن رسوم التحويل إلى البنوك الأخرى
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b">
                          <span>التحويلات المحلية</span>
                          <span className="font-medium">5 د.إ</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>التحويلات الدولية</span>
                          <span className="font-medium">50 د.إ</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>المحافظ الإلكترونية</span>
                          <span className="font-medium">15 د.إ</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ملاحظة: قد تطبق البنوك المستلمة رسوماً إضافية على
                          التحويلات.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
