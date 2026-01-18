import { useEffect, useState } from "react";
import { userApi, type User } from "./services/userApi";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string>("");

    async function loadUsers() {
        setErr("");
        setLoading(true);
        try {
            const data = await userApi.list();
            setUsers(data);
        } catch (e: any) {
            setErr(e?.message ?? "Failed to load users");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function onAdd(e: React.FormEvent) {
        e.preventDefault();
        setErr("");

        if (!name.trim() || !email.trim()) {
            setErr("Name và Email không được rỗng.");
            return;
        }

        setLoading(true);
        try {
            await userApi.create({ name: name.trim(), email: email.trim() });
            setName("");
            setEmail("");
            await loadUsers();
        } catch (e: any) {
            setErr(e?.message ?? "Failed to create user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui" }}>
            <h1>Frontend Test: Add user + List users</h1>

            <form onSubmit={onAdd} style={{ display: "grid", gap: 10, marginTop: 16 }}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button disabled={loading} type="submit">
                    {loading ? "Working..." : "Add User"}
                </button>
            </form>

            {err && (
                <p style={{ color: "crimson", marginTop: 12 }}>
                    <b>Error:</b> {err}
                </p>
            )}

            <div style={{ marginTop: 24, display: "flex", gap: 10, alignItems: "center" }}>
                <h2 style={{ margin: 0 }}>Users</h2>
                <button disabled={loading} onClick={loadUsers}>
                    Refresh
                </button>
            </div>

            {loading && users.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul style={{ marginTop: 12 }}>
                    {users.map((u) => (
                        <li key={u.id}>
                            <b>{u.name}</b> — {u.email} (id: {u.id})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
