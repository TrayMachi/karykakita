"use client";
import React, { useEffect } from "react";
import { TransitionLink } from "@/components/utils/TransitionLink";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { doc, getDoc } from "firebase/firestore";
import { useAuth, useData } from "@/components/contexts/context";
import { useRouter, usePathname } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, Tag, Plus, Store, Brush } from "lucide-react";

export const Navbar = () => {
  const [user, setUser] = useAuth();
  const [data, setData] = useData();

  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = auth.currentUser?.uid ? auth.currentUser?.uid : "";
        const docRef = doc(db, "user", userId);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              //if (
              //  pathname === "/login" ||
              //  pathname === "/register" ||
              //  pathname === "/dashboard/admin"
              //) {
              //  router.push("/dashboard");
              //}
              setUser(user);
              setData(docSnap.data());
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      } else {
        setUser(null);
        //if (pathname === "/dashboard" || pathname === "/dashboard/admin") {
        //  router.push("/login");
        //}
      }
    });
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success("Logout Successful", {
          description: "You have been logged out",
        });
        window.location.reload();
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <nav className="flex justify-between items-center h-[100px] py-[18px] px-20 bg-background drop-shadow-md">
      <TransitionLink href="/">
        <div className="relative w-[110px] h-[110px]">
          <Image
            alt="contoh"
            src={"/KaryaKitaLogoNoDesc.png"}
            fill
            sizes="none"
            className="object-contain"
          />
        </div>
      </TransitionLink>
      {user === null ? (
        <div className="flex flex-row gap-[72px] items-center">
          <TransitionLink
            href="/"
            className={`text-[16px] font-poppins font-semibold ${
              pathname === "/" ? "text-[#45349F]" : "text-[#CCCBCB]"
            }`}
          >
            Beranda
          </TransitionLink>
          <TransitionLink href="/login">
            <Button className="w-[118px] text-[16px] font-poppins">
              Masuk
            </Button>
          </TransitionLink>
        </div>
      ) : (
        <div className="flex flex-row gap-[72px] items-center">
          <TransitionLink
            href="/"
            className={`text-[16px] font-poppins font-semibold ${
              pathname === "/" ? "text-[#45349F]" : "text-[#CCCBCB]"
            }`}
          >
            Beranda
          </TransitionLink>
          <TransitionLink
            href="/cart"
            className={`text-[16px] font-poppins font-semibold ${
              pathname === "/cart" ? "text-[#45349F]" : "text-[#CCCBCB]"
            }`}
          >
            Keranjang
          </TransitionLink>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-3 p-6 bg-transparent text-primary text-[16px] font-semibold hover:text-primary">
                  <Avatar>
                    <AvatarImage src={user?.photoURL ?? ""} alt="" />
                  </Avatar>
                  {user.displayName}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <div className="flex flex-col items-start justify-center gap-3 p-4 w-[232px]">
                    <div className="text-[18px] flex gap-2 items-center font-poppins font-medium text-primary">
                      <Image
                        src="/KaKiKoin.png"
                        alt="koin"
                        width={24}
                        height={24}
                      />
                      {data?.koin}
                      <TransitionLink href="/topup">
                        <Plus />
                      </TransitionLink>
                    </div>
                    <div className="bg-[#B5B3B3] flex flex-col h-[1px] w-[200px]" />
                    <TransitionLink
                      href="/profile"
                      className={`text-[18px] flex gap-2 font-poppins font-medium ${
                        pathname === "/profile"
                          ? "text-[#45349F]"
                          : "text-[#CCCBCB]"
                      }`}
                    >
                      <Settings />
                      Profil
                    </TransitionLink>
                    {data?.isPenjual ? (
                      <div className="flex flex-col items-start justify-center gap-3">
                        <TransitionLink
                          href="/dashboard"
                          className={`text-[18px] flex gap-2 font-poppins font-medium ${
                            pathname === "/dashboard"
                              ? "text-[#45349F]"
                              : "text-[#CCCBCB]"
                          }`}
                        >
                          <Store />
                          Menu Penjual
                        </TransitionLink>
                        <TransitionLink
                          href="/dashboard/jual"
                          className={`text-[18px] flex gap-2 font-poppins font-medium ${
                            pathname === "/dashboard/jual"
                              ? "text-[#45349F]"
                              : "text-[#CCCBCB]"
                          }`}
                        >
                          <Brush />
                          Jual Karya
                        </TransitionLink>
                      </div>
                    ) : (
                      <TransitionLink
                        href="/register/toko"
                        className={`text-[18px] flex gap-2 font-poppins font-medium ${
                          pathname === "/register/toko"
                            ? "text-[#45349F]"
                            : "text-[#CCCBCB]"
                        }`}
                      >
                        <Tag />
                        Jadi penjual
                      </TransitionLink>
                    )}
                    <div className="bg-[#B5B3B3] flex flex-col h-[1px] w-[200px]" />
                    <div
                      onClick={logOut}
                      className="text-[16px] flex gap-2 font-poppins font-medium text-destructive cursor-pointer hover:text-destructive/90"
                    >
                      <LogOut />
                      Logout
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </nav>
  );
};
