export interface Room {
  id: string;
  nombre: string;
  descripcion: string;
  direcciones: {
    norte: string | null;
    sur: string | null;
    este: string | null;
    oeste: string | null;
  };
}

export const worldMap: Room[] = [
  {
    id: "entrada",
    nombre: "Entrada de la Cueva",
    descripcion: "Un arco de piedra antiguo cubierto de musgo. El aire es frío.",
    direcciones: { norte: "pasillo", sur: null, este: null, oeste: null }
  },
  {
    id: "pasillo",
    nombre: "Pasillo de las Sombras",
    descripcion: "Un pasillo largo con antorchas que parpadean. Hay puertas a los lados.",
    direcciones: { norte: "trono", sur: "entrada", este: "biblioteca", oeste: "celda" }
  },
  {
    id: "biblioteca",
    nombre: "Gran Biblioteca",
    descripcion: "Miles de libros polvorientos llenan las paredes.",
    direcciones: { norte: null, sur: null, este: null, oeste: "pasillo" }
  },
  {
    id: "celda",
    nombre: "Celda Olvidada",
    descripcion: "Una habitación pequeña y húmeda con marcas en las paredes.",
    direcciones: { norte: null, sur: null, este: "pasillo", oeste: null }
  },
  {
    id: "trono",
    nombre: "Salón del Trono",
    descripcion: "Un salón majestuoso. Un trono de hueso preside la estancia.",
    direcciones: { norte: null, sur: "pasillo", este: null, oeste: null }
  }
];

export const getRoomById = (id: string): Room | undefined => {
  return worldMap.find(room => room.id === id);
};