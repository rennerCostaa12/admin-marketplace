import { writeFile, readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

interface BlackListTokensProps {
  black_list_tokens: string[];
}

export async function POST(request: NextRequest) {
  try {
    const token = await request.json();

    const pathFile = `${process.cwd()}/public/black_list_tokens.json`;

    const datasFile = await readFile(pathFile, "utf-8");

    const blackListsToken: BlackListTokensProps = JSON.parse(datasFile);

    blackListsToken.black_list_tokens.push(token.token);

    const objectTokens = {
      black_list_tokens: blackListsToken.black_list_tokens,
    };

    writeFile(pathFile, JSON.stringify(objectTokens));

    return NextResponse.json({
      status: 201,
      message: "Token salvo com sucesso.",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Erro ao salvar token na lista negra",
    });
  }
}

export async function GET() {
  try {
    const datasFile = await readFile(
      `${process.cwd()}/public/black_list_tokens.json`,
      "utf-8"
    );

    return NextResponse.json({ response: JSON.parse(datasFile) });
  } catch (error) {
    throw new Error("Erro ao pegar listas");
  }
}
