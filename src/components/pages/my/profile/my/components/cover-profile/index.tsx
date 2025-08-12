import Image from "next/image";

export default function CoverProfile() {
    return (
        <div className="relative h-44 w-full overflow-hidden">
            <Image
                src={"/imgs/placeholder.svg?height=180&width=1200&query=fondo%20finanzas%20abstracto%20verde"}
                alt="Fondo del perfil"
                width={1200}
                height={180}
                className="h-full w-full object-cover"
            />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>
    );
}