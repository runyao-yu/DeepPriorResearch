export const siteContent = {
  brand: {
    name: "DeepPrior",
    tagline: "A Quantitative Research Organization",
    footerNote: "A Quantitative Research Organization",
  },
  committee: {
    eyebrow: "Committee",
    title: "DEEPPRIOR",
    description:
      "Deep learning meets prior knowledge for quantitative energy forecasting.",
    members: [
      {
        name: "Runyao Yu",
        role: "Founder",
        initials: "RY",
        bio: "Runyao advances uncertainty-aware electricity price forecasting across day-ahead, intraday, and balancing markets, with a focus on probabilistic modeling, market microstructure, and foundation models for energy systems. His academic path includes a PhD at TU Delft and an MSc from TU Munich, complemented by visiting positions at ETH Zurich and London Business School. Alongside academia, he serves as Lead Data Scientist at (Bugatti-) Rimac Automobili, with industrial experience at BMW, Danfoss, KPMG, and Arup. At DeepPrior, Runyao leads research at the intersection of AI, forecasting, and real-world energy market decision-making.",
        image: "",
      },
      {
        name: "Ruiling Ding",
        role: "Co-Founder",
        initials: "RD",
        bio: "Ruiling combines top-tier financial rigor with strategic development for high-growth technology. Her foundation is anchored in Investment Banking at Morgan Stanley and SMBC in London and Frankfurt, with professional tenures at PwC, Infineon, and Deutsche Börse. With a background in international business development for Chinese SaaS and robotics startups, she bridges the gap between technical research and commercial strategy. Ruiling holds an MSc in Finance from Frankfurt School, with international studies at UC Berkeley and UBC. At DeepPrior, she steers operations and finance within the European energy forecasting sector.",
        image: "",
      },
      {
        name: "Prof. ",
        role: "Committee Chair",
        initials: "DWB",
        bio: "to be filled.",
        image: "",
      },
      {
        name: "Prof. ",
        role: "Committee Chair",
        initials: "PP",
        bio: "to be filled.",
        image: "",
      },
      {
        name: "Prof. ",
        role: "Committee Chair",
        initials: "JLC",
        bio: "to be filled.",
        image: "",
      },
      {
        name: "Prof. ",
        role: "Committee Chair",
        initials: "ZF",
        bio: "to be filled.",
        image: "",
      },
      {
        name: "Dr. Jochen Stiasny",
        role: "Member",
        initials: "JS",
        bio: "Postdoc at TU Delft, PhD from DTU, and MSc from ETH Zurich, with exchange experience at Washington University and Lund University; Team Lead at AMZ Racing and industrial experience at Secure Switzerland AG.",
        image: "",
      },
      {
        name: "Dr. Andreas Billert",
        role: "Member",
        initials: "AB",
        bio: "Industrial PhD from BMW and KIT, MSc from TU Munich, with exchange experience at SJTU and UC Berkeley; Cluster Lead at BMW, with industrial experience at Siemens.",
        image: "",
      },
      {
        name: "Yuchen Tao",
        role: "Member",
        initials: "YT",
        bio: "MSc from RWTH Aachen and BSc from SJTU; Senior Deep Learning Engineer at Hyundai MOBIS, with industrial experience at Bosch (BCAI), Volkswagen, and Michelin.",
        image: "",
      },
      {
        name: "Yuqicheng Zhu",
        role: "Member",
        initials: "YZ",
        bio: "PhD from Max Planck Institute and University of Stuttgart, MSc from TU Munich, with visiting position at Oxford University; Industrial experience at Bosch (BCAI).",
        image: "",
      },
      {
        name: "Yujie Chen",
        role: "Member",
        initials: "YC",
        bio: "PhD from The Chinese University of Hongkong (Shenzhen), with a visiting position at Westlake University; recipient of the national scholarship.",
        image: "",
      },
      {
        name: "Wentao Wang",
        role: "Member",
        initials: "WW",
        bio: "PhD from University of Technology Sydney; recipient of the national scholarship for postgraduates and UTS international research scholarship.",
        image: "",
      },
    ],
  },
  research: {
    eyebrow: "Research",
    title: "A research archive built for depth.",
    description:
      "DeepPrior promotes reproducible and impactful research in energy forecasting, including but not limited to electricity prices, renewable generation, power grid load, and battery systems.",
    papers: [
      {
        title: "PriceFM: Foundation Model for Probabilistic Electricity Price Forecasting",
        authors: "Runyao Yu, Chenhui Gu, Jochen Stiasny, Qingsong Wen, Wasim Sarwar Dilov, Lianlian Qi, Jochen L. Cremer",
        abstract: "A foundation-model approach for probabilistic day-ahead electricity price forecasting that leverages large-scale pretraining to generalize across 38 bidding zones, horizons, and market conditions.",
        journal: "ArXiv Preprint",
        year: "Feb 2026",
        paperUrl: "https://arxiv.org/abs/2508.04875",
        dataUrl: "https://huggingface.co/datasets/RunyaoYu/PriceFM/tree/main",
        codeUrl: "https://github.com/runyao-yu/PriceFM",
        bibtex: `@misc{yu2026pricefmfoundationmodelprobabilistic,
      title={PriceFM: Foundation Model for Probabilistic Electricity Price Forecasting}, 
      author={Runyao Yu and Chenhui Gu and Jochen Stiasny and Qingsong Wen and Wasim Sarwar Dilov and Lianlian Qi and Jochen L. Cremer},
      year={2026},
      eprint={2508.04875},
      archivePrefix={arXiv},
      primaryClass={cs.CE},
      url={https://arxiv.org/abs/2508.04875}, 
}`,
        figures: [
          {
            title: "Structure of PriceFM",
            image: "Figure/Research/PriceFM.svg",
          },
        ],
      },
      
      {
        title: "OrderFusion: Encoding Orderbook for End-to-End Probabilistic Intraday Electricity Price Forecasting",
        authors: "Runyao Yu, Yuchen Tao, Fabian Leimgruber, Tara Esterl, Jochen Stiasny, Derek W. Bunn, Qingsong Wen, Hongye Guo, Jochen L. Cremer",
        abstract: "An end-to-end probabilistic intraday electricity price forecasting framework that encodes orderbook structure directly to capture richer market-state information and forecast ID1, ID2, and ID3 with uncertainty.",
        journal: "ArXiv Preprint",
        year: "Feb 2026",
        paperUrl: "https://arxiv.org/pdf/2502.06830",
        dataUrl: "https://webshop.eex-group.com/epex-spot-public-market-data",
        codeUrl: "https://github.com/runyao-yu/OrderFusion",
        bibtex: `@misc{yu2026orderfusionencodingorderbookendtoend,
      title={OrderFusion: Encoding Orderbook for End-to-End Probabilistic Intraday Electricity Price Forecasting}, 
      author={Runyao Yu and Yuchen Tao and Fabian Leimgruber and Tara Esterl and Jochen Stiasny and Derek W. Bunn and Qingsong Wen and Hongye Guo and Jochen L. Cremer},
      year={2026},
      eprint={2502.06830},
      archivePrefix={arXiv},
      primaryClass={q-fin.CP},
      url={https://arxiv.org/abs/2502.06830}, 
}`,
        figures: [
          {
            title: "Structure of OrderFusion",
            image: "Figure/Research/OrderFusion.svg",
          }
        ],
      },

      {
        title: "Placeholder Paper",
        authors: "Author Name, Author Name, Author Name",
        abstract: "Add the abstract here. Keep it concise so the card stays readable while still describing the main contribution.",
        journal: "Journal / Conference Name",
        year: "2025",
        paperUrl: "https://github.com/",
        dataUrl: "https://github.com/",
        codeUrl: "https://github.com/",
        bibtex: `@article{deepprior2025placeholder2,
  title   = {Placeholder Paper Two},
  author  = {Author, Name and Author, Name and Author, Name},
  journal = {Journal / Conference Name},
  year    = {2025}
}`,
        figures: [
          {
            title: "Structure of Placeholder",
            image: "",
          }
        ],
      },

      {
        title: "Placeholder Paper",
        authors: "Author Name, Author Name, Author Name",
        abstract: "Add the abstract here. Keep it concise so the card stays readable while still describing the main contribution.",
        journal: "Journal / Conference Name",
        year: "2025",
        paperUrl: "https://github.com/",
        dataUrl: "https://github.com/",
        codeUrl: "https://github.com/",
        bibtex: `@article{deepprior2025placeholder2,
  title   = {Placeholder Paper Two},
  author  = {Author, Name and Author, Name and Author, Name},
  journal = {Journal / Conference Name},
  year    = {2025}
}`,
        figures: [
          {
            title: "Structure of Placeholder",
            image: "",
          }
        ],
      },

    ],
  },
  analysis: {
    eyebrow: "Analysis",
    title: "Weekly analysis built for signal.",
    description:
      "DeepPrior provides weekly energy data analysis to deliver timely and actionable insights across various electricity markets and energy systems.",
    posts: [
      {
        date: "11 Apr 2026",
        country: "Germany",
        feature: "Day-Ahead Prices",
        summary:
          "Weekend prices softened as wind generation strengthened into the evening peak and compressed upside risk.",
        details:
          "Use this card for a weekly note that isolates one market story, states the main signal in one sentence, and then explains the operational drivers, structural context, and likely implications in a short paragraph.",
        figures: [
          {
            title: "Price",
            image: "Figure/Analysis/2026_4_11/Price.jpg",
          },
          {
            title: "Solar",
            image: "Figure/Analysis/2026_4_11/Solar.jpg",
          },
          {
            title: "Wind",
            image: "Figure/Analysis/2026_4_11/Wind.jpg",
          },
        ],
      },
      {
        date: "04 Apr 2026",
        country: "Austria",
        feature: "Solar",
        summary:
          "Midday solar output capped intraday volatility, but the late ramp still widened balancing pressure into the close.",
        details:
          "Keep the top summary crisp and directional, then use this body copy for the fuller interpretation: what changed, why it mattered, and which feature or regime shift the figures below are meant to support.",
        figures: [],
      },
    ],
  },
};
