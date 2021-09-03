import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AttachmentFileDocument = AttachmentFile & Document;

@Schema()
export class AttachmentFile {
    @Prop()
    name: string;

    @Prop()
    client: string;

    @Prop()
    data: string;

    @Prop()
    type: string;
}

export const AttachmentFileSchema = SchemaFactory.createForClass(AttachmentFile);