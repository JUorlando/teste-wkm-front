import Link from "next/link";
import "../app/styles/globals.css";

export default function Home() {
  return (
    <div className="box">
      <h1 className="title">Bem-vindo à Aplicação WKM</h1>
      <p className="text">Use o link abaixo para adicionar uma nova pessoa:</p>
      <Link href="/pessoa/add">
        <button className="btn">Adicionar</button>
      </Link>
    </div>
  );
}
