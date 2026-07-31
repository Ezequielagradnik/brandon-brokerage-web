export type Offering = {
  n: string;
  title: string;
  desc: string;
  // Two-line summary for cards; `desc` keeps the full site copy for reference.
  blurb: string;
  img: string;
};

// Real "What We Offer" copy from brandonbrokerage.com
export const OFFERINGS: Offering[] = [
  {
    n: "01",
    title: "Solutions for Foreign National Clients",
    desc: "With over 50 years of experience, we are an industry leader in the foreign national market. We help our agents devise customized sales strategies and wealth management solutions for their foreign national clients. Our open-architecture business approach allows us to offer a variety of products and services available to best suit your clients' needs while still adhering to all carrier, state and federal guidelines.",
    blurb: "An industry leader in the foreign national market, with customized strategies for your international clients.",
    img: "/images/wwo-compass.jpg",
  },
  {
    n: "02",
    title: "Advanced Sales Support",
    desc: "Brandon Brokerage Group provides full sales support and expertise for both domestic and foreign national life cases, as well as disability, annuity and long-term care sales. From case planning and design, to marketing sales concepts and strategies, carrier insight, and point-of-sale support, our highly trained team will help you provide a superior sales experience to your clients and further develop all facets of your business.",
    blurb: "Case design, sales concepts, carrier insight and point-of-sale support across every line we broker.",
    img: "/images/wwo-growth.jpg",
  },
  {
    n: "03",
    title: "Full Case Management",
    desc: "Our dedicated new business team provides full underwriting support, expertise and case management for all new client applications. From packaging and processing client applications to ordering and reviewing medical records, we help ensure a streamlined and professional experience from solicitation to policy delivery for our agents and their clients.",
    blurb: "A dedicated new-business team runs underwriting and paperwork from application to policy delivery.",
    img: "/images/wwo-papers.jpg",
  },
  {
    n: "04",
    title: "Quality Carriers & Products",
    desc: "Brandon Brokerage Group is a leading Tellus/Crump firm offering nationwide services and full access to over thirty top-rated life insurance carriers. We enhance the value and scope of services our agents can offer their clients by forging professional partnerships with the industry's leading carriers and providing individualized support and quality products.",
    blurb: "A leading Tellus/Crump firm with full access to 30+ top-rated carriers, nationwide.",
    img: "/images/wwo-gears.jpg",
  },
];
