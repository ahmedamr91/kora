export interface Env {
  FOOTBALL_DATA_API_KEY?: string;
  OPENAI_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
}

const demoMatches = [
  { id: "m-001", status: "live", minute: 64, competition: "دوري أبطال أوروبا", home: "ريال مدريد", away: "برشلونة", homeScore: 2, awayScore: 1, ai: "ريال يهاجم المساحة خلف الظهير الأيسر وبرشلونة يحتاج لاعب وسط ثالث لكسر الضغط." },
  { id: "m-002", status: "upcoming", minute: null, competition: "الدوري المصري", home: "الأهلي", away: "الزمالك", homeScore: null, awayScore: null, ai: "قمة كلاسيكية تعتمد على التحولات السريعة والكرات الثانية." },
  { id: "m-003", status: "finished", minute: 90, competition: "الدوري الإنجليزي", home: "ليفربول", away: "أرسنال", homeScore: 3, awayScore: 2, ai: "الحسم جاء من جودة الأطراف في آخر 20 دقيقة." }
];

const demoStories = [
  { id: "s-001", title: "ليلة العودة", tag: "ذاكرة المباراة", summary: "قصة مباراة غيرت مزاج الجماهير وتحولت إلى مرجع لكل مواجهة لاحقة." },
  { id: "s-002", title: "جيل ضد جيل", tag: "تحليل تاريخي", summary: "عندما تصطدم الخبرة بالحماس تظهر واحدة من أجمل قصص المنافسة." }
];

function json(data: unknown, env: Env, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": env.ALLOWED_ORIGIN || "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type,authorization"
    }
  });
}

async function fetchFootballData(path: string, env: Env) {
  if (!env.FOOTBALL_DATA_API_KEY) return null;
  const res = await fetch(`https://api.football-data.org/v4${path}`, {
    headers: { "X-Auth-Token": env.FOOTBALL_DATA_API_KEY }
  });
  if (!res.ok) return null;
  return res.json();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return json({ ok: true }, env);

    if (url.pathname === "/" || url.pathname === "/health") {
      return json({ name: "Madraj API", ok: true, endpoints: ["/matches", "/matches/live", "/stories", "/competitions"] }, env);
    }

    if (url.pathname === "/matches") {
      const providerData = await fetchFootballData("/matches", env);
      return json({ source: providerData ? "football-data.org" : "demo", data: providerData || demoMatches }, env);
    }

    if (url.pathname === "/matches/live") {
      return json({ source: "demo", data: demoMatches.filter((m) => m.status === "live") }, env);
    }

    if (url.pathname === "/stories") {
      return json({ source: "demo", data: demoStories }, env);
    }

    if (url.pathname === "/competitions") {
      const providerData = await fetchFootballData("/competitions", env);
      return json({ source: providerData ? "football-data.org" : "demo", data: providerData || ["الدوري المصري", "دوري أبطال أوروبا", "الدوري الإنجليزي"] }, env);
    }

    return json({ error: "Not found" }, env, 404);
  }
};
