import { useState, useEffect } from 'react';
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
  features: string[];
}

interface CartItem extends Watch {
  quantity: number;
}

const watches: Watch[] = [
  {
    id: 1,
    name: 'Presage Cocktail Time',
    brand: 'SEIKO',
    price: 125000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/7a60fdf3-26b8-4869-8b00-43b5052d9c6a.jpg',
    description: 'Автоматические часы с сапфировым стеклом',
    features: ['Автоподзавод', 'Запас хода 41 час', 'Водонепроницаемость 50м']
  },
  {
    id: 2,
    name: 'Eco-Drive Titanium',
    brand: 'CITIZEN',
    price: 95000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/6508b97d-340c-4d61-b800-6cadde0ee5cd.jpg',
    description: 'Хронограф на солнечной батарее',
    features: ['Титановый корпус', 'Сапфировое стекло', 'Хронограф']
  },
  {
    id: 3,
    name: 'Bambino Open Heart',
    brand: 'ORIENT',
    price: 78000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/5436aa99-9aa9-4443-bf8b-c482215a6b2a.jpg',
    description: 'Классические часы с открытым механизмом',
    features: ['Ручной завод', 'Открытый механизм', 'Итальянский ремешок']
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent">
                TIMEPIECE
              </span>
              <span className="text-foreground ml-2">TOKYO</span>
            </h1>
            
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors duration-300">Главная</button>
              <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors duration-300">Каталог</button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors duration-300">О бренде</button>
              <button onClick={() => scrollToSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors duration-300">Доставка</button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors duration-300">Контакты</button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative border-primary/20 hover:border-primary hover:bg-primary/5">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground animate-scale-in">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="font-serif text-3xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-16">
                      <Icon name="ShoppingBag" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground text-lg">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-card/50 border border-border/50">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{item.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                              <div className="flex items-center gap-3">
                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, -1)}>
                                  <Icon name="Minus" size={12} />
                                </Button>
                                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, 1)}>
                                  <Icon name="Plus" size={12} />
                                </Button>
                              </div>
                              <p className="text-primary font-bold text-lg mt-2">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="hover:text-destructive">
                              <Icon name="X" size={18} />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Итого:</span>
                          <span className="text-primary text-2xl">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full h-12 text-base" size="lg">
                          Оформить заказ
                          <Icon name="ArrowRight" size={20} className="ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-background"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,0,0.1),transparent_50%)]" />
          
          <div className="container mx-auto px-6 text-center relative z-10 py-20">
            <div className="mb-8 animate-fade-in">
              <Badge variant="outline" className="text-sm px-4 py-2 border-primary/30 text-primary">
                Эксклюзивная коллекция 2024
              </Badge>
            </div>
            
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-8 tracking-tighter animate-slide-up">
              <span className="block bg-gradient-to-br from-foreground via-primary/90 to-foreground bg-clip-text text-transparent">
                Искусство
              </span>
              <span className="block mt-2 bg-gradient-to-br from-primary via-yellow-400 to-primary bg-clip-text text-transparent">
                времени
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Откройте для себя легендарные японские часы премиум-класса.
              <br />Традиции, точность и безупречный стиль.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                onClick={() => scrollToSection('catalog')} 
                className="text-lg px-10 h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Смотреть коллекцию
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('about')} 
                className="text-lg px-10 h-14 border-primary/30 hover:border-primary"
              >
                О бренде
              </Button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <Icon name="ChevronDown" size={32} className="text-primary" />
          </div>
        </section>

        <section id="catalog" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
                Каталог
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                Каждые часы — произведение искусства японских мастеров
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {watches.map((watch, index) => (
                <Card 
                  key={watch.id} 
                  className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-card">
                    <img 
                      src={watch.image} 
                      alt={watch.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">{watch.brand}</Badge>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-serif font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {watch.name}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{watch.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {watch.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Цена</p>
                        <span className="text-3xl font-bold text-primary">{watch.price.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(watch);
                        }}
                        className="h-12 px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                      >
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

        <section id="about" className="py-32 bg-gradient-to-b from-transparent via-card to-transparent">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 animate-fade-in-left">
                  <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                    О бренде
                  </h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      <span className="text-primary font-semibold">TIMEPIECE TOKYO</span> — эксклюзивный дистрибьютор 
                      премиальных японских часов в России. Прямое сотрудничество с легендарными производителями: 
                      Seiko, Citizen и Orient.
                    </p>
                    <p>
                      Наша миссия — предоставить ценителям доступ к лучшим образцам японского 
                      часового искусства. Каждые часы проходят строгий контроль качества.
                    </p>
                    <p className="text-primary font-medium">
                      Японские часы — символ точности, надежности и безупречного вкуса.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6 animate-fade-in-right">
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                    <div className="text-6xl font-bold text-primary mb-2">15+</div>
                    <p className="text-muted-foreground">лет на рынке</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                    <div className="text-6xl font-bold text-primary mb-2">5000+</div>
                    <p className="text-muted-foreground">довольных клиентов</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                    <div className="text-6xl font-bold text-primary mb-2">100%</div>
                    <p className="text-muted-foreground">оригинальная продукция</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="delivery" className="py-32">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-center mb-20 animate-fade-in">
              Преимущества
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: 'Truck', title: 'Быстрая доставка', desc: 'По Москве 1-2 дня, по России 3-7 дней' },
                { icon: 'Shield', title: 'Гарантия 2 года', desc: 'Официальная гарантия производителя' },
                { icon: 'Package', title: 'Премиум упаковка', desc: 'Защита от повреждений при доставке' },
                { icon: 'CreditCard', title: 'Гибкая оплата', desc: 'Наличные, карта, рассрочка 0%' }
              ].map((item, index) => (
                <Card 
                  key={index} 
                  className="text-center p-8 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon name={item.icon as any} size={40} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-32 bg-gradient-to-b from-transparent via-card to-transparent">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-center mb-20 animate-fade-in">
              Контакты
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="p-12 border-border/50">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-semibold mb-2">Адрес</h3>
                        <p className="text-muted-foreground leading-relaxed">г. Москва, ул. Тверская, д. 15, офис 301</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-semibold mb-2">Телефон</h3>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-semibold mb-2">Email</h3>
                        <p className="text-muted-foreground">info@timepiece-tokyo.ru</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-semibold mb-2">Часы работы</h3>
                        <p className="text-muted-foreground">Пн-Пт: 10:00 - 20:00<br />Сб-Вс: 11:00 - 19:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card/50 border-t border-border/50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold">
              <span className="bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent">
                TIMEPIECE
              </span>
              <span className="text-foreground ml-2">TOKYO</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Эксклюзивные японские часы премиум-класса
            </p>
            <div className="flex justify-center gap-6 pt-6">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Youtube" size={20} />
              </Button>
            </div>
            <Separator className="my-8" />
            <p className="text-sm text-muted-foreground">
              © 2024 TIMEPIECE TOKYO. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
