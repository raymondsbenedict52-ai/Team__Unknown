import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
    const navigate = useNavigate();

    return (
        <div className="bg-background font-display text-text-main h-screen overflow-hidden flex">
            {/* Sidebar */}
            <aside className="w-16 flex-shrink-0 border-r border-surface-border bg-surface flex flex-col items-center py-6 gap-8">
                {/* App Icon */}
                <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined">vital_signs</span>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-6 flex-1">
                    <button
                        onClick={() => navigate("/")}
                        className="text-text-secondary hover:text-primary"
                    >
                        <span className="material-symbols-outlined">grid_view</span>
                    </button>

                    <button
                        onClick={() => navigate("/trends")}
                        className="text-text-secondary hover:text-primary"
                    >
                        <span className="material-symbols-outlined">monitoring</span>
                    </button>

                    <button
                        onClick={() => navigate("/daily")}
                        className="text-text-secondary hover:text-primary"
                    >
                        <span className="material-symbols-outlined">restaurant</span>
                    </button>

                    <button
                        onClick={() => navigate("/profile")}
                        className="bg-primary-light text-primary rounded-xl p-2"
                    >
                        <span className="material-symbols-outlined">person</span>
                    </button>
                </nav>

                <span className="material-symbols-outlined text-text-secondary">
          settings
        </span>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                <header className="flex justify-between items-center">
                    <div>
                        <p className="text-xs text-text-secondary uppercase">Account</p>
                        <h1 className="text-xl font-bold">Profile & Settings</h1>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-danger"
                    >
                        <span className="material-symbols-outlined">logout</span>
                    </button>
                </header>

                {/* Profile */}
                <div className="flex flex-col items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/150"
                        alt="Profile"
                        className="size-24 rounded-full border-4 border-white shadow"
                    />
                    <h2 className="text-lg font-bold">Alex Morgan</h2>
                    <p className="text-sm text-text-secondary">
                        Patient ID: <b>#8492-MB</b>
                    </p>
                </div>

                {/* Personal Details */}
                <section className="bg-surface rounded-2xl p-5 border space-y-4">
                    <div className="flex justify-between">
                        <h3 className="font-bold">Personal Details</h3>
                        <button className="text-primary text-sm">Edit</button>
                    </div>

                    <input
                        readOnly
                        value="Alex Morgan"
                        className="w-full rounded-xl bg-slate-50 border p-3"
                    />
                    <input
                        readOnly
                        value="alex.morgan@example.com"
                        className="w-full rounded-xl bg-slate-50 border p-3"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            readOnly
                            value="12/04/1988"
                            className="rounded-xl bg-slate-50 border p-3"
                        />
                        <input
                            readOnly
                            value="A+"
                            className="rounded-xl bg-slate-50 border p-3"
                        />
                    </div>
                </section>

                {/* Health Profile */}
                <section className="bg-surface rounded-2xl p-5 border space-y-4">
                    <h3 className="font-bold">Health Profile</h3>

                    <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-red-50 text-danger rounded-lg">
              Type 2 Diabetes
            </span>
                        <span className="px-3 py-1 bg-orange-50 text-warning rounded-lg">
              Hypertension
            </span>
                        <button className="px-3 py-1 border rounded-lg text-sm">
                            + Add
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between bg-slate-50 p-3 rounded-xl">
                            <div>
                                <b>Metformin</b>
                                <p className="text-xs text-text-secondary">
                                    500mg • 2x Daily
                                </p>
                            </div>
                            <span className="material-symbols-outlined text-danger">
                delete
              </span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
