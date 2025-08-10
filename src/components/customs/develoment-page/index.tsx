'use client'
import { CalendarTwoTone, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"

export default function DevelopmentPage() {
    return (
        <main className="flex-1">
            <section className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-2 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-500 bg-muted/40">
                            <CalendarTwoTone className="mr-2 h-4 w-4 text-amber-600" />
                            {"Próximamente — Estamos preparando algo increíble"}
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                            {"Estamos construyendo la próxima versión de "}
                            <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
                                {"tu experiencia"}
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground">
                            {
                                "Gracias por tu paciencia. Esta página aún no está disponible. Te avisaremos cuando lancemos."
                            }
                        </p>

                        {/* <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="email" className="sr-only">
                    {"Correo electrónico"}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <Button type="submit" className="h-11 bg-amber-600 hover:bg-amber-700 text-white">
                  <Mail className="mr-2 h-4 w-4" />
                  {"Avísenme"}
                </Button>
              </form> */}

                        <div className="flex items-center gap-4 pt-2">
                            <span className="text-sm text-muted-foreground">{"Síguenos:"}</span>
                            <div className="flex items-center gap-2">
                                <Link
                                    href="#"
                                    aria-label="Twitter"
                                    className="p-2 rounded-md border hover:bg-muted transition-colors"
                                >
                                    <TwitterOutlined className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="#"
                                    aria-label="Instagram"
                                    className="p-2 rounded-md border hover:bg-muted transition-colors"
                                >
                                    <InstagramOutlined className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="#"
                                    aria-label="LinkedIn"
                                    className="p-2 rounded-md border hover:bg-muted transition-colors"
                                >
                                    <LinkedinOutlined className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-amber-100 to-transparent blur-2xl opacity-70" />
                        <div className="rounded-2xl border border-slate-300 bg-background p-4 sm:p-6">
                            <Image
                                src="/imgs/placeholder.svg"
                                alt="Ilustración de un sitio en construcción con una grúa y conos de seguridad"
                                width={640}
                                height={360}
                                className="rounded-lg w-full h-auto"
                                priority
                            />
                            <div className="mt-4 text-sm text-muted-foreground">
                                {"Vista previa conceptual de la página en construcción."}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}