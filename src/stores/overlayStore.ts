import { create } from "zustand"

interface OverlayState {
	currentId: number;
	setCurrentId: (id: number) => void

}


export const useOverLayStore = create<OverlayState>()((set) => ({
	currentId: 0,
	setCurrentId: (id: number) => set((state) => ({ currentId: state.currentId = id }))
}))
