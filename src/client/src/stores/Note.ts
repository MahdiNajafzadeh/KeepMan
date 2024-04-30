import { defineStore } from "pinia";
import { AxiosError } from "axios";
import request from "@/lib/request.js";

interface Note {
	noteId: number;
	userId: number;
	title: string;
	content: string;
	render: string;
	createAt: string;
	updateAt: string;
}

export const useProfileStore = defineStore("Note", {
	state: () => ({
		notes: []
	}),
	actions: {
		search(word: string): Note[] {
			return this.notes.filter(
				(note: Note) => note.content.includes(word) || note.title.includes(word)
			);
		},
		getById(id: number): Note | undefined {
			return this.notes.find((note: Note) => note.noteId === id);
		},
		async load() {
			try {
				const response = await request.get("http://localhost:3000/api/note");
				const notes = response.data?.data;
				this.notes = notes;
				return { status: true, data: notes };
			} catch (error: any) {
				if (error instanceof AxiosError) {
					const response = error.response?.data;
					return { ...response };
				} else {
					return { status: false, error };
				}
			}
		}
	}
});
