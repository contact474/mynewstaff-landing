const {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, ExternalHyperlink,
  Table, TableRow, TableCell
} = require("docx");
const fs = require("fs");

const GOLD = "C9A84C";
const DARK = "0A1628";
const GRAY = "666666";
const GREEN = "25D366";

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0 },
  bottom: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
};

function scriptBlock(title, bestFor, lines) {
  const children = [
    new Paragraph({
      spacing: { before: 400, after: 100 },
      children: [new TextRun({ text: title, bold: true, size: 28, font: "Arial", color: DARK })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: "Best for: ", bold: true, size: 20, font: "Arial", color: GRAY }),
        new TextRun({ text: bestFor, italics: true, size: 20, font: "Arial", color: GRAY }),
      ],
    }),
  ];
  const scriptParas = lines.map(line =>
    new Paragraph({
      spacing: { after: line === "" ? 120 : 60 },
      children: [new TextRun({ text: line === "" ? " " : line, size: 20, font: "Arial", color: "333333" })],
    })
  );
  children.push(new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: {
          top: { style: BorderStyle.SINGLE, size: 2, color: GOLD },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "EEEEEE" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "EEEEEE" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "EEEEEE" },
        },
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: "FAFAF7", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 300, right: 300 },
        children: scriptParas,
      })],
    })],
  }));
  return children;
}

function divider() {
  return new Paragraph({
    spacing: { before: 300, after: 300 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "\u2501".repeat(30), size: 16, color: "DDDDDD", font: "Arial" })],
  });
}

const WA_LINK = "https://wa.me/13058503664?text=Hey%20Luka!%20I%27m%20interested%20in%20the%20MyNewStaff%20partner%20program%20%F0%9F%91%8B";

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 40, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 0, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 1 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: "MyNewStaff.ai", size: 16, color: GOLD, font: "Arial", bold: true }),
            new TextRun({ text: "  |  Partner Outreach Scripts", size: 16, color: GRAY, font: "Arial" }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 16, color: GRAY, font: "Arial" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GRAY, font: "Arial" }),
            new TextRun({ text: "  \u2022  ", size: 16, color: "DDDDDD", font: "Arial" }),
            new TextRun({ text: "CONFIDENTIAL", size: 14, color: GOLD, font: "Arial", bold: true }),
          ],
        })],
      }),
    },
    children: [
      // Title block
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "MYNEWSTAFF.AI", size: 18, font: "Arial", bold: true, color: GOLD, characterSpacing: 300 }),
      ]}),
      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 80 }, children: [
        new TextRun({ text: "WhatsApp Partner Outreach Scripts", size: 44, bold: true, font: "Arial", color: DARK }),
      ]}),
      new Paragraph({ spacing: { after: 400 }, children: [
        new TextRun({ text: "For influencer groups (job-seeking, collab-hunting, UGC creators)", size: 22, font: "Arial", color: GRAY, italics: true }),
      ]}),

      // Quick info table
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2340, 7020],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2340, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 0, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: "WhatsApp:", bold: true, size: 20, font: "Arial", color: GREEN })] })] }),
            new TableCell({ borders: noBorders, width: { size: 7020, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 0, right: 0 },
              children: [new Paragraph({ children: [new ExternalHyperlink({ link: WA_LINK,
                children: [new TextRun({ text: "+1 (305) 850-3664", style: "Hyperlink", size: 20, font: "Arial" })],
              })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2340, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 0, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: "Partner Page:", bold: true, size: 20, font: "Arial", color: DARK })] })] }),
            new TableCell({ borders: noBorders, width: { size: 7020, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 0, right: 0 },
              children: [new Paragraph({ children: [new ExternalHyperlink({ link: "https://mynewstaff.ai/partners",
                children: [new TextRun({ text: "mynewstaff.ai/partners", style: "Hyperlink", size: 20, font: "Arial" })],
              })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2340, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 0, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: "Availability:", bold: true, size: 20, font: "Arial", color: DARK })] })] }),
            new TableCell({ borders: noBorders, width: { size: 7020, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 0, right: 0 },
              children: [new Paragraph({ children: [new TextRun({ text: "10 spots/quarter \u2014 Q2 2026", size: 20, font: "Arial", color: GRAY })] })] }),
          ]}),
        ],
      }),

      divider(),

      // SCRIPTS
      ...scriptBlock("SCRIPT 1 \u2014 Main Drop (English)", "General influencer/creator groups, UGC groups, collab groups", [
        "Hey everyone \u2014 quick one for creators looking to level up their brand without spending cash.",
        "",
        "We\u2019re running a barter program at MyNewStaff.ai where you post content (stories/reels) and earn $500\u2013$3,500 in build credits.",
        "",
        "What you get with credits:",
        "\u2192 Custom landing page (yours to keep)",
        "\u2192 Professional press kit",
        "\u2192 Explainer video with AI voiceover",
        "\u2192 30-day content pack (hooks, captions, visuals)",
        "\u2192 Full brand visibility stack",
        "",
        "No cash changes hands. You post, we build.",
        "",
        "Only 10 spots per quarter \u2014 9 left for Q2.",
        "",
        "Check it out: mynewstaff.ai/partners",
        "",
        "DM me if you have questions or want to apply directly \uD83E\uDD19",
      ]),
      divider(),

      ...scriptBlock("SCRIPT 2 \u2014 Short & Punchy (English)", "Fast-moving groups, groups with strict no-spam rules", [
        "Open collab for creators \uD83E\uDD1D",
        "",
        "Post stories/reels about our AI marketing platform \u2192 earn $500\u2013$3,500 in build credits \u2192 redeem for landing pages, press kits, videos, or content packs.",
        "",
        "Zero cash. Pure value exchange.",
        "",
        "10 spots/quarter, 9 left.",
        "",
        "Details + apply: mynewstaff.ai/partners",
      ]),
      divider(),

      ...scriptBlock("SCRIPT 3 \u2014 Spanish (LATAM Groups)", "Spanish-speaking influencer/creator groups", [
        "\u00A1Hola! Algo r\u00E1pido para creadores que buscan mejorar su marca sin gastar dinero.",
        "",
        "Tenemos un programa de trueque en MyNewStaff.ai:",
        "",
        "Publicas contenido (stories/reels) \u2192 Ganas $500\u2013$3,500 en cr\u00E9ditos \u2192 Los canjeas por:",
        "\u2192 Landing page profesional",
        "\u2192 Press kit (PDF de 5\u20137 p\u00E1ginas)",
        "\u2192 Video explicativo con voz IA",
        "\u2192 Pack de contenido de 30 d\u00EDas",
        "\u2192 Stack completo de visibilidad",
        "",
        "No se paga nada. T\u00FA publicas, nosotros construimos.",
        "",
        "Solo 10 lugares por trimestre \u2014 quedan 9 para Q2.",
        "",
        "M\u00E1s info: mynewstaff.ai/partners",
        "",
        "Escr\u00EDbeme si te interesa o quieres aplicar directo \uD83E\uDD19",
      ]),

      new Paragraph({ children: [new PageBreak()] }),

      ...scriptBlock("SCRIPT 4 \u2014 UGC/Job Group Angle", "Groups where creators actively seek paid/barter opportunities", [
        "Barter opportunity \u2014 not a paid gig, but arguably more valuable.",
        "",
        "We\u2019re MyNewStaff.ai \u2014 we build AI-powered marketing systems (landing pages, CRM, content engines, outreach). Real company \u2014 $3M+ USD generated for our clients in the last 2 months alone.",
        "",
        "The deal:",
        "1. You post stories/reels featuring our platform",
        "2. You earn $500 / $1,500 / $3,500 in build credits",
        "3. You pick what we build for you",
        "",
        "Example: Post 4 stories \u2192 get a professional press kit or a content pack with 12 hooks + captions + 2-week plan.",
        "",
        "Or go bigger: Post 3 reels + 6 stories \u2192 get a full landing page + press kit combo worth $6K+.",
        "",
        "This isn\u2019t exposure. This is real deliverables you keep forever.",
        "",
        "Apply here: mynewstaff.ai/partners",
        "",
        "Happy to answer questions in DM.",
      ]),
      divider(),

      ...scriptBlock("SCRIPT 5 \u2014 Operator/Agency Groups", "Agency owner groups, marketing professional groups", [
        "For operators and agency owners looking to add revenue without building from scratch:",
        "",
        "We have a Business-in-a-Box partnership \u2014 white-label our AI marketing stack and sell it under your brand. 30% commission on everything you close.",
        "",
        "What you resell:",
        "\u2192 AI-powered CRM (Mission Control)",
        "\u2192 Content engines",
        "\u2192 Landing pages & funnels",
        "\u2192 Lead generation systems",
        "\u2192 Behavioral email automation",
        "",
        "We handle 100% of fulfillment. You handle the relationship.",
        "",
        "Or if you have an audience \u2014 our barter program lets you trade content for $500\u2013$3,500 in build credits (landing pages, press kits, videos, etc).",
        "",
        "Full details: mynewstaff.ai/partners",
        "",
        "DM me to set up an alignment call.",
      ]),

      new Paragraph({ children: [new PageBreak()] }),

      // USAGE NOTES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [
        new TextRun({ text: "USAGE NOTES", size: 32, bold: true, font: "Arial", color: DARK }),
      ]}),
      new Paragraph({ spacing: { before: 200, after: 80 }, children: [
        new TextRun({ text: "Timing: ", bold: true, size: 22, font: "Arial", color: DARK }),
        new TextRun({ text: "Post in groups during peak hours (10am\u201312pm or 7\u20139pm local time)", size: 22, font: "Arial", color: GRAY }),
      ]}),
      new Paragraph({ spacing: { before: 200, after: 80 }, children: [
        new TextRun({ text: "Follow-up: ", bold: true, size: 22, font: "Arial", color: DARK }),
        new TextRun({ text: "If someone shows interest, send them the direct WhatsApp link:", size: 22, font: "Arial", color: GRAY }),
      ]}),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
        rows: [new TableRow({ children: [new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" }, left: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" }, right: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" } },
          width: { size: 9360, type: WidthType.DXA },
          shading: { fill: "F0F0F0", type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 200, right: 200 },
          children: [new Paragraph({ children: [new ExternalHyperlink({ link: WA_LINK,
            children: [new TextRun({ text: "https://wa.me/13058503664", style: "Hyperlink", size: 18, font: "Consolas" })],
          })] })],
        })] })],
      }),

      divider(),

      // DM TEMPLATE
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [
        new TextRun({ text: "DM RESPONSE TEMPLATE", size: 32, bold: true, font: "Arial", color: DARK }),
      ]}),
      ...["Hey! Thanks for the interest \uD83D\uDE4C", "",
        "Here\u2019s the quick breakdown:",
        "\u2022 You post stories/reels about MyNewStaff.ai",
        "\u2022 You earn build credits ($500\u2013$3,500 depending on package)",
        "\u2022 You pick a bundle: landing page, press kit, explainer video, content pack, or combo",
        "", "Everything is on this page: mynewstaff.ai/partners",
        "", "You can apply directly on the page or just tell me your IG handle + follower count and I\u2019ll get you set up.",
      ].map(l => new Paragraph({ spacing: { after: l === "" ? 120 : 60 }, children: [new TextRun({ text: l === "" ? " " : l, size: 20, font: "Arial", color: "333333" })] })),

      divider(),

      // OBJECTION HANDLERS
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [
        new TextRun({ text: "OBJECTION HANDLERS", size: 32, bold: true, font: "Arial", color: DARK }),
      ]}),
      ...[
        { q: "\u201CIs this legit?\u201D", a: "100%. Check mynewstaff.ai \u2014 we\u2019re an AI marketing company that\u2019s generated $3M+ USD for our clients in the last 2 months alone. The partner page has screenshots of our live systems." },
        { q: "\u201CWhat\u2019s the catch?\u201D", a: "No catch. We get promotion, you get real deliverables. Zero cash, zero risk. If the content doesn\u2019t perform, you still keep the credits." },
        { q: "\u201CHow many followers do I need?\u201D", a: "No minimum. We care more about engagement rate and niche relevance. Apply and we\u2019ll review within 48h." },
      ].flatMap(({ q, a }) => [
        new Paragraph({ spacing: { before: 200, after: 60 }, children: [new TextRun({ text: q, bold: true, italics: true, size: 22, font: "Arial", color: DARK })] }),
        new Paragraph({ spacing: { after: 40 }, indent: { left: 360 }, children: [
          new TextRun({ text: "\u2192 ", size: 22, font: "Arial", color: GOLD }),
          new TextRun({ text: a, size: 20, font: "Arial", color: GRAY }),
        ]}),
      ]),

      // Footer branding
      new Paragraph({ spacing: { before: 600 } }),
      new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
        rows: [new TableRow({ children: [new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 2, color: GOLD }, bottom: noBorders.bottom, left: noBorders.left, right: noBorders.right },
          width: { size: 9360, type: WidthType.DXA },
          margins: { top: 200, bottom: 100, left: 0, right: 0 },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [
              new TextRun({ text: "MyNewStaff.ai", bold: true, size: 20, font: "Arial", color: GOLD }),
              new TextRun({ text: " \u2014 AI-Powered Marketing for Ambitious Brands", size: 20, font: "Arial", color: GRAY }),
            ]}),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [
              new TextRun({ text: "contact@mynewstaff.ai  |  +1 (305) 850-3664  |  mynewstaff.ai/partners", size: 16, font: "Arial", color: "999999" }),
            ]}),
          ],
        })] })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = "C:\\Users\\Vitaly\\Desktop\\MNS-Partner-Outreach-Scripts.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Done! Saved to: " + outPath);
});
