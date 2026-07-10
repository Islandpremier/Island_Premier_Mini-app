import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      name,
      description,
      category,
      price_list,
      image_url,
      video_url,
      available,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "ID prodotto mancante.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        description,
        category,
        price_list,
        image_url,
        video_url,
        available,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      product: data,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Errore interno del server.",
      },
      {
        status: 500,
      }
    );
  }
}