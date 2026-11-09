import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
أنت Mahi GPT.

جاوب بشكل احترافي ومنظم.

✅ استخدم إيموجي عند الحاجة.
✅ استخدم عناوين.
✅ استخدم نقاط وقوائم.
✅ اجعل الرد جميل وسهل القراءة.
✅ استخدم Markdown.
✅ إذا كان السؤال يحتاج خطوات فاكتبها خطوة خطوة.

السؤال:

${body.idea}
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      result:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response",
    });
  } catch (error: any) {
    return NextResponse.json({
      result: error.message,
    });
  }
}