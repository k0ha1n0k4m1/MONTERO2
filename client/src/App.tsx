import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Product from "@/pages/product";
import NotFound from "@/pages/not-found";
import Orders from "@/pages/orders";
import Wishlist from "@/pages/wishlist";
import Profile from "@/pages/profile";
import Support from "@/pages/support";
import Contact from "@/pages/contact";
import SizeGuide from "@/pages/size-guide";
import Returns from "@/pages/returns";
import Checkout from "@/pages/checkout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:categoryName" component={Home} />
      <Route path="/product/:id" component={Product} />
      <Route path="/orders" component={Orders} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/profile" component={Profile} />
      <Route path="/support" component={Support} />
      <Route path="/contact" component={Contact} />
      <Route path="/size-guide" component={SizeGuide} />
      <Route path="/returns" component={Returns} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
