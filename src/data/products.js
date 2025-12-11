export const products = {
  nike: {
    name: "Nike",
    models: {
      mercurial: {
        name: "Nike Mercurial Vapor",
        description:
          "A Nike Mercurial a sebesség szimbóluma: vékony felsőrész, robbanékony indulások, agresszív stoplik. Gyors szélsőknek, csatároknak ideális.",
        image: "/placeholder/mercurial.jpg", // később cseréljük

        tiers: {
          Elite: {
            name: "Nike Mercurial Vapor Elite FG",
            details: {
              subtitle: "Profi szintű speed cipő",
              weight: "könnyű, kb. 190g",
              upper: "Vékony, rugalmas szintetikus felsőrész",
              ground: "FG – normál füves pályákra",
              feel: "Nagyon direkt labdaérintés",
              recommended:
                "Gyors szélsőknek, csatároknak, akik sok sprintet futnak.",
            },
            video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            partners: [
              {
                shop: "DemoSport",
                price: "79 990 Ft",
                link: "#",
              },
              {
                shop: "GlobalBoots",
                price: "189 €",
                link: "#",
              },
            ],
          },

          Pro: {
            name: "Nike Mercurial Vapor Pro FG",
            details: {
              subtitle: "Erős teljesítmény elérhető áron",
              weight: "kb. 210g",
              upper: "Minőségi szintetikus felsőrész",
              ground: "FG – füves pályákra",
              feel: "Gyors, jó tapadás",
              recommended: "Hobbi és félprofi játékosoknak.",
            },
            video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            partners: [
              {
                shop: "BootWorld",
                price: "59 990 Ft",
                link: "#",
              },
            ],
          },

          Academy: {
            name: "Nike Mercurial Vapor Academy MG",
            details: {
              subtitle: "Megbízható hobbi speed csuka",
              weight: "kb. 230g",
              upper: "Tartósabb felsőrész",
              ground: "MG – vegyes talajra",
              feel: "Kényelmesebb, stabilabb",
              recommended:
                "Azoknak, akik sokat játszanak változó pályákon.",
            },
            video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            partners: [
              {
                shop: "FociShop",
                price: "39 990 Ft",
                link: "#",
              },
            ],
          },

          Club: {
            name: "Nike Mercurial Vapor Club",
            details: {
              subtitle: "Belépő szintű Mercurial érzet",
              weight: "kb. 250g+",
              upper: "Egyszerűbb anyagok",
              ground: "FG/TF/IC verziók",
              feel: "Stabil, masszív",
              recommended: "Kezdőknek és alkalmi játékra.",
            },
            video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            partners: [
              {
                shop: "SportOutlet",
                price: "24 990 Ft",
                link: "#",
              },
            ],
          },
        },
      },

      phantom: {
        name: "Nike Phantom GX",
        description:
          "Precíziós irányítás, puhább felsőrész és technikás játékhoz fejlesztett talpkialakítás.",
        image: "/placeholder/phantom.jpg",
        tiers: {}, // később kitöltjük
      },

      tiempo: {
        name: "Nike Tiempo Legend",
        description:
          "Kényelmes, bőr felsőrészű modell stabilitást és kontrollt kínál.",
        image: "/placeholder/tiempo.jpg",
        tiers: {}, // később
      },
    },
  },

  adidas: {
    name: "Adidas",
    models: {
      predator: {
        name: "Adidas Predator",
        description:
          "Erős lövésekhez és kontrollhoz tervezett modell gumipaneles felsőrésszel.",
        image: "/placeholder/predator.jpg",
        tiers: {}, // majd kitöltjük
      },

      x: {
        name: "Adidas X",
        description:
          "Speed orientált cipő könnyű felsőrésszel és modern talpszerkezettel.",
        image: "/placeholder/x.jpg",
        tiers: {},
      },

      copa: {
        name: "Adidas Copa",
        description:
          "Klasszikus bőr felsőrész, maximális érzet és kényelem a labdával.",
        image: "/placeholder/copa.jpg",
        tiers: {},
      },
    },
  },

  puma: {
    name: "Puma",
    models: {
      ultra: {
        name: "Puma Ultra",
        description:
          "Könnyű speed cipő, modern, agresszív talpkialakítással.",
        image: "/placeholder/ultra.jpg",
        tiers: {},
      },

      future: {
        name: "Puma Future",
        description:
          "Rugalmas felsőrész, kiváló illeszkedés – kreatív játékosoknak.",
        image: "/placeholder/future.jpg",
        tiers: {},
      },
    },
  },
};
