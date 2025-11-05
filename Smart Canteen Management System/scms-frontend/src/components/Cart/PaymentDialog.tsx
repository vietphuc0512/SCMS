import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Smartphone, QrCode, Banknote, CheckCircle } from 'lucide-react';
import { CartItem } from '@/types';
import { toast } from 'sonner';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  totalAmount: number;
  onSuccess: () => void;
}

export default function PaymentDialog({ 
  open, 
  onOpenChange, 
  items, 
  totalAmount, 
  onSuccess 
}: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const paymentMethods = [
    {
      id: 'qr',
      name: 'QR Code',
      description: 'Quét mã QR để thanh toán',
      icon: QrCode,
      color: 'text-blue-600'
    },
    {
      id: 'ewallet',
      name: 'Ví điện tử',
      description: 'MoMo, ZaloPay, ViettelPay',
      icon: Smartphone,
      color: 'text-green-600'
    },
    {
      id: 'card',
      name: 'Thẻ ngân hàng',
      description: 'Visa, Mastercard, ATM',
      icon: CreditCard,
      color: 'text-purple-600'
    },
    {
      id: 'cash',
      name: 'Tiền mặt',
      description: 'Thanh toán tại quầy',
      icon: Banknote,
      color: 'text-orange-600'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Show success message after a short delay
    setTimeout(() => {
      toast.success('Thanh toán thành công!');
      onSuccess();
      setIsSuccess(false);
      onOpenChange(false);
    }, 1500);
  };

  const selectedMethod = paymentMethods.find(method => method.id === paymentMethod);

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Thanh toán thành công!</h3>
            <p className="text-muted-foreground text-center">
              Đơn hàng của bạn đã được xác nhận và sẽ được chuẩn bị sớm nhất.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thanh toán đơn hàng</DialogTitle>
          <DialogDescription>
            Chọn phương thức thanh toán phù hợp
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{item.menuItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.menuItem.price)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(item.menuItem.price * item.quantity)}
                  </span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="font-medium">Chọn phương thức thanh toán</h4>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Icon className={`h-5 w-5 ${method.color}`} />
                    <div className="flex-1">
                      <Label htmlFor={method.id} className="font-medium cursor-pointer">
                        {method.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Payment Info */}
          {selectedMethod && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-3">
                  <selectedMethod.icon className={`h-5 w-5 ${selectedMethod.color}`} />
                  <span className="font-medium">{selectedMethod.name}</span>
                </div>
                
                {paymentMethod === 'qr' && (
                  <div className="text-center py-4">
                    <div className="w-32 h-32 bg-gray-100 mx-auto mb-3 flex items-center justify-center rounded-lg">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quét mã QR bằng ứng dụng ngân hàng
                    </p>
                  </div>
                )}
                
                {paymentMethod === 'cash' && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Vui lòng thanh toán tại quầy khi nhận hàng
                    </p>
                  </div>
                )}
                
                {(paymentMethod === 'ewallet' || paymentMethod === 'card') && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Bạn sẽ được chuyển đến trang thanh toán
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Hủy
            </Button>
            <Button 
              className="flex-1" 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Đang xử lý...' : `Thanh toán ${formatCurrency(totalAmount)}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}