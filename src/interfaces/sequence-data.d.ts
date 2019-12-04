export interface TypeNoun {
  parentTypeSingular: string;
  parentTypePlural: string;
  childTypeSingular: string;
  childTypePlural: string;
}

export interface SequenceData extends TypeNoun {
  child: any;
  childList: any[];
  parentIndex: number;
  childIndex: number;
}

export interface SequenceInputItem {
  sequenceId: string;
  name: string;
  input: (T: any) => boolean;
}
