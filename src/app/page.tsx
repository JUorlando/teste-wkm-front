import Link from 'next/link';

export default function Home() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Bem-vindo à Aplicação</h1>
            <p>Use o link abaixo para adicionar uma nova pessoa:</p>
            <Link href="/pessoa/add">
                <button style={{ padding: '10px 20px' }}>Adicionar Pessoa</button>
            </Link>
        </div>
    );
}
