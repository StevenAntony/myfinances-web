export enum TypeSummary {
    POSITIVE = 'positivo',
    NEGATIVE = 'negative'
};

type Props = {
    type: TypeSummary;
    title: string;
    percentage: number;
    description: string;
};

export default Props;