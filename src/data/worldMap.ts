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
    nombre: "Pasadizo Temporal",
    descripcion: "Mi máquina del tiempo falló y aterricé repentinamente en otra época. Estoy en un pasillo de piedra muy estrecho, y todo a mi alrededor está lleno de escombros antiguos.\n\n«La brújula de la nave indica que la única salida libre es por el sur. Toca ir por ahí...»",
    direcciones: { norte: null, sur: "templo", este: null, oeste: null }
  },
  {
    id: "templo",
    nombre: "Templo del Origen",
    descripcion: "Acabo de salir del pasillo y llegué a una especie de templo gigante abandonado. Hay enormes estatuas de monstruos extraños que imponen bastante respeto.\n\n«Veo varios caminos distintos. Voy a echar un vistazo por aquí, pero si algo sale mal, sé que puedo regresar al norte.»",
    direcciones: { norte: "entrada", sur: "biblioteca", este: "trono", oeste: "celda" }
  },
  {
    id: "biblioteca",
    nombre: "Biblioteca Perdida",
    descripcion: "Entré a un cuarto lleno de rocas talladas y libros tan antiguos que se rompen con solo tocarlos. Qué mala suerte; un derrumbe tapó por completo las escaleras y no puedo pasar.\n\n«Bueno, parece que no hay paso por aquí. Creo que lo mejor será volver hacia el templo.»",
    direcciones: { norte: "templo", sur: null, este: null, oeste: null }
  },
  {
    id: "celda",
    nombre: "Prisión Fósil",
    descripcion: "El piso de este lugar está repleto de huesos enormes; seguramente son de algún animal prehistórico. A lo lejos escucho gritos y mucho ruido. Parece una tribu salvaje y suenan bastante violentos.\n\n«Esto se ve mal. Ni loco sigo por ahí, será mejor darme la vuelta y regresar antes de que me vean.»",
    direcciones: { norte: null, sur: null, este: "templo", oeste: null }
  },
  {
    id: "trono",
    nombre: "Altar del Dios Sol",
    descripcion: "Llegué a un altar que brilla con luces extrañas, y alrededor hay manchas que parecen de algún antiguo ritual. Todo está muy silencioso, y hay una enorme pared de piedra negra bloqueando el camino.\n\n«Al parecer no hay salida por este lado. No veo cómo pasar este muro gigante, me tocará regresar.»",
    direcciones: { norte: null, sur: null, este: null, oeste: "templo" }
  }
];

export const getRoomById = (id: string): Room | undefined => {
  return worldMap.find(room => room.id === id);
};