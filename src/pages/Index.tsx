import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Watch {
  quantity: number;
}

const watches: Watch[] = [
  {
    id: 1,
    name: 'Seiko Presage',
    brand: 'SEIKO',
    price: 125000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/7a60fdf3-26b8-4869-8b00-43b5052d9c6a.jpg',
    description: 'Автоматические часы с сапфировым стеклом'
  },
  {
    id: 2,
    name: 'Citizen Eco-Drive',
    brand: 'CITIZEN',
    price: 95000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/6508b97d-340c-4d61-b800-6cadde0ee5cd.jpg',
    description: 'Хронограф на солнечной батарее'
  },
  {
    id: 3,
    name: 'Orient Bambino',
    brand: 'ORIENT',
    price: 78000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/5436aa99-9aa9-4443-bf8b-c482215a6b2a.jpg',
    description: 'Классические часы с механизмом handwinding'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (watch: Watch) => {
    const existingItem = cart.find(item => item.id === watch.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...watch, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
              <span className="text-primary">TIMEPIECE</span> TOKYO
            </h1>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('catalog')} className="hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">О бренде</button>
              <button onClick={() => scrollToSection('delivery')} className="hover:text-primary transition-colors">Доставка</button>
              <button onClick={() => scrollToSection('warranty')} className="hover:text-primary transition-colors">Гарантия</button>
              <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                            <p className="text-primary font-semibold">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Итого:</span>
                        <span className="text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">Оформить заказ</Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
              Искусство времени
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Эксклюзивная коллекция японских наручных часов премиум-класса
            </p>
            <Button size="lg" onClick={() => scrollToSection('catalog')} className="text-lg px-8">
              Смотреть коллекцию
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </section>

        <section id="catalog" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">Каталог</h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Каждые часы — это произведение искусства, созданное мастерами своего дела
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {watches.map((watch) => (
                <Card key={watch.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img 
                      src={watch.image} 
                      alt={watch.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-2">{watch.brand}</Badge>
                    <h3 className="text-2xl font-serif font-semibold mb-2">{watch.name}</h3>
                    <p className="text-muted-foreground mb-4">{watch.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{watch.price.toLocaleString('ru-RU')} ₽</span>
                      <Button onClick={() => addToCart(watch)}>
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">О бренде</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  TIMEPIECE TOKYO — это эксклюзивный дистрибьютор премиальных японских часов в России. 
                  Мы сотрудничаем напрямую с ведущими производителями, такими как Seiko, Citizen и Orient.
                </p>
                <p>
                  Наша миссия — предоставить ценителям качественных часов доступ к лучшим образцам 
                  японского часового искусства. Каждые часы в нашей коллекции проходят строгий контроль 
                  качества и поставляются с полной гарантией производителя.
                </p>
                <p>
                  Японские часы славятся своей точностью, надежностью и инновационными технологиями. 
                  Они являются символом статуса и безупречного вкуса.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="delivery" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">Доставка</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground">По Москве — 1-2 дня, по России — 3-7 дней</p>
              </Card>
              
              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Package" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Безопасная упаковка</h3>
                <p className="text-muted-foreground">Премиальная упаковка с защитой от повреждений</p>
              </Card>
              
              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CreditCard" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Удобная оплата</h3>
                <p className="text-muted-foreground">Наличные, карта, рассрочка 0%</p>
              </Card>
            </div>
          </div>
        </section>

        <section id="warranty" className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">Гарантия</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <Icon name="Shield" size={40} className="text-primary mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-3">Гарантия производителя</h3>
                  <p className="text-muted-foreground">2 года официальной гарантии от производителя на все модели</p>
                </Card>
                
                <Card className="p-6">
                  <Icon name="CheckCircle" size={40} className="text-primary mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-3">100% оригинал</h3>
                  <p className="text-muted-foreground">Все часы поставляются напрямую от официальных производителей</p>
                </Card>
                
                <Card className="p-6">
                  <Icon name="RefreshCw" size={40} className="text-primary mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-3">Обмен и возврат</h3>
                  <p className="text-muted-foreground">14 дней на обмен или возврат без объяснения причин</p>
                </Card>
                
                <Card className="p-6">
                  <Icon name="Wrench" size={40} className="text-primary mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-3">Сервисное обслуживание</h3>
                  <p className="text-muted-foreground">Профессиональное обслуживание в авторизованных центрах</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">Контакты</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Тверская, д. 15, офис 301</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 mb-6">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 mb-6">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">info@timepiece-tokyo.ru</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2">Часы работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 10:00 - 20:00<br />Сб-Вс: 11:00 - 19:00</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">
            <span className="text-primary">TIMEPIECE</span> TOKYO
          </h2>
          <p className="text-muted-foreground mb-4">Эксклюзивные японские часы премиум-класса</p>
          <p className="text-sm text-muted-foreground">© 2024 TIMEPIECE TOKYO. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
