import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  discount?: number;
}

interface CartItem extends Watch {
  quantity: number;
}

const watches: Watch[] = [
  {
    id: 1,
    name: 'Heritage Automatic',
    brand: 'SEIKO',
    price: 145000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/7a60fdf3-26b8-4869-8b00-43b5052d9c6a.jpg',
    description: 'Механические часы с запасом хода 50 часов',
    inStock: true,
    discount: 15
  },
  {
    id: 2,
    name: 'Promaster Diver',
    brand: 'CITIZEN',
    price: 98000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/6508b97d-340c-4d61-b800-6cadde0ee5cd.jpg',
    description: 'Дайверские часы с Eco-Drive',
    inStock: true
  },
  {
    id: 3,
    name: 'Classic Dress',
    brand: 'ORIENT',
    price: 72000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/5436aa99-9aa9-4443-bf8b-c482215a6b2a.jpg',
    description: 'Элегантные часы для официальных мероприятий',
    inStock: true
  },
  {
    id: 4,
    name: 'Prestige GMT',
    brand: 'SEIKO',
    price: 189000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/7a60fdf3-26b8-4869-8b00-43b5052d9c6a.jpg',
    description: 'GMT с функцией второго часового пояса',
    inStock: true
  },
  {
    id: 5,
    name: 'Titanium Sport',
    brand: 'CITIZEN',
    price: 115000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/6508b97d-340c-4d61-b800-6cadde0ee5cd.jpg',
    description: 'Легкие спортивные часы из титана',
    inStock: false
  },
  {
    id: 6,
    name: 'Vintage Revival',
    brand: 'ORIENT',
    price: 85000,
    image: 'https://cdn.poehali.dev/projects/f7093d3a-57ba-4498-850a-54a1abf3cfc0/files/5436aa99-9aa9-4443-bf8b-c482215a6b2a.jpg',
    description: 'Винтажный стиль с современным механизмом',
    inStock: true,
    discount: 10
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

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

  const filteredWatches = selectedBrand === 'all' 
    ? watches 
    : watches.filter(w => w.brand === selectedBrand);

  const brands = ['all', ...Array.from(new Set(watches.map(w => w.brand)))];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Watch" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-foreground">
                  JAPAN WATCHES
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Премиальные японские часы</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-6 mr-4">
                <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
                <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
                <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingBag" size={20} />
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
                      <div className="text-center py-12">
                        <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {cart.map(item => (
                            <Card key={item.id} className="p-4">
                              <div className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm">{item.name}</h4>
                                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}>
                                      <Icon name="Minus" size={12} />
                                    </Button>
                                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}>
                                      <Icon name="Plus" size={12} />
                                    </Button>
                                  </div>
                                  <p className="text-primary font-bold mt-2">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Итого:</span>
                            <span className="text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-background">
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-xs">Новая коллекция 2024</Badge>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold mb-6 tracking-tight leading-tight">
              Японское<br />мастерство<br />на вашем запястье
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Эксклюзивная коллекция часов от легендарных брендов Seiko, Citizen и Orient
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                Смотреть каталог
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-center">Каталог часов</h2>
            <p className="text-muted-foreground text-center mb-8">Выберите идеальные часы из нашей коллекции</p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {brands.map(brand => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? 'default' : 'outline'}
                  onClick={() => setSelectedBrand(brand)}
                  className="text-sm"
                >
                  {brand === 'all' ? 'Все' : brand}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWatches.map((watch, index) => {
              const finalPrice = watch.discount 
                ? watch.price * (1 - watch.discount / 100) 
                : watch.price;

              return (
                <Card 
                  key={watch.id} 
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary/20">
                    <img 
                      src={watch.image} 
                      alt={watch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {watch.discount && (
                      <Badge className="absolute top-3 left-3 bg-accent">-{watch.discount}%</Badge>
                    )}
                    {!watch.inStock && (
                      <Badge variant="secondary" className="absolute top-3 right-3">Нет в наличии</Badge>
                    )}
                    <Badge variant="outline" className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm">
                      {watch.brand}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:text-primary transition-colors">
                      {watch.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{watch.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {watch.discount ? (
                          <div>
                            <p className="text-xs text-muted-foreground line-through">{watch.price.toLocaleString('ru-RU')} ₽</p>
                            <p className="text-2xl font-bold text-primary">{Math.round(finalPrice).toLocaleString('ru-RU')} ₽</p>
                          </div>
                        ) : (
                          <p className="text-2xl font-bold text-foreground">{watch.price.toLocaleString('ru-RU')} ₽</p>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={() => addToCart(watch)}
                      disabled={!watch.inStock}
                      className="w-full"
                    >
                      {watch.inStock ? (
                        <>
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </>
                      ) : 'Нет в наличии'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">О нашем магазине</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Мы специализируемся на продаже оригинальных японских часов премиум-класса. 
                    В нашем ассортименте представлены модели от ведущих производителей: Seiko, Citizen и Orient.
                  </p>
                  <p>
                    Каждые часы проходят тщательную проверку качества и поставляются с официальной гарантией производителя.
                  </p>
                  <p className="font-semibold text-foreground">
                    Более 10 лет опыта работы с японскими брендами
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 text-center">
                  <Icon name="Award" size={40} className="mx-auto mb-3 text-primary" />
                  <p className="text-3xl font-bold mb-1">2 года</p>
                  <p className="text-sm text-muted-foreground">Гарантия</p>
                </Card>
                <Card className="p-6 text-center">
                  <Icon name="Truck" size={40} className="mx-auto mb-3 text-primary" />
                  <p className="text-3xl font-bold mb-1">1-3 дня</p>
                  <p className="text-sm text-muted-foreground">Доставка</p>
                </Card>
                <Card className="p-6 text-center">
                  <Icon name="Users" size={40} className="mx-auto mb-3 text-primary" />
                  <p className="text-3xl font-bold mb-1">3000+</p>
                  <p className="text-sm text-muted-foreground">Клиентов</p>
                </Card>
                <Card className="p-6 text-center">
                  <Icon name="Star" size={40} className="mx-auto mb-3 text-primary" />
                  <p className="text-3xl font-bold mb-1">4.9</p>
                  <p className="text-sm text-muted-foreground">Рейтинг</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-12 text-center">Свяжитесь с нами</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-6">Контактная информация</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Тверская, д. 12</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-muted-foreground">info@japanwatches.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Часы работы</p>
                      <p className="text-muted-foreground">Пн-Пт: 10:00 - 20:00<br />Сб-Вс: 11:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-4">Задать вопрос</h3>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email" />
                  </div>
                  <div>
                    <Input placeholder="Телефон" />
                  </div>
                  <div>
                    <textarea 
                      className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                      placeholder="Ваше сообщение"
                    />
                  </div>
                  <Button className="w-full">
                    Отправить сообщение
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/30 border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Watch" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold">JAPAN WATCHES</h3>
                <p className="text-xs text-muted-foreground">Премиальные японские часы</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Youtube" size={20} />
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Japan Watches. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
