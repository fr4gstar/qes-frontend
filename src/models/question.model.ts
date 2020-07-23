export class Question {
    id: string;
    text: string;
    type: string;
    category: string;
    answers: Array<{id: string; text: string}>;
}
