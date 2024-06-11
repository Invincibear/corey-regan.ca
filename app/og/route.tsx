import { BlogConfig }    from "@/config/blog"
import { SocialLinks }   from "@/config/links"
import { DOMAIN }        from "@/config/site"
import { ImageResponse } from "next/og"
import { NextRequest }   from "next/server"


export const runtime = "edge"

const interBold = fetch(
  new URL("/assets/fonts/Inter-Bold.ttf", import.meta.url)
).then(
  (res) => res.arrayBuffer()
)


export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold
    const { searchParams } = req.nextUrl
    const title = searchParams.get("title")

    if (!title) return new Response("No title provided", { status: 500 })

    const heading = title.length > 140 ? `${title.substring(0, 140)}...` : title

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white"
          style={{
            // backgroundImage: "http://localhost/opengraph-image.png",
          }}
        >
          <div tw="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sparkles">
              <path
                d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
              <path d="M20 3v4"/>
              <path d="M22 5h-4"/>
              <path d="M4 17v2"/>
              <path d="M5 18H3"/>
            </svg>
            <p tw="ml-2 font-bold text-2xl">{BlogConfig.name}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
              BLOG POST
            </div>
            <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">{DOMAIN}</div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">{SocialLinks.github}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1600,
        height: 842,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    )
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 })
  }
}
