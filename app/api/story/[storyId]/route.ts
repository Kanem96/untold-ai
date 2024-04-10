import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { storyId: string } }) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId, difficulty } = body;

        if(!params.storyId) {
            return new NextResponse("Story ID is required", {status: 400})
        }

        if(!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorised", {status: 401})
        }

        if(!src || !name || !description || !instructions || !seed || !categoryId || !difficulty ) {
            return new NextResponse("Missing required fields", {status: 400})
        }

        const companion = await prismadb.story.update({
            where: {
                id: params.storyId,
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,
                difficulty,
            }
        })

        return NextResponse.json(companion)
    } catch (error) {
        console.log("[STORY_PATCH]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}