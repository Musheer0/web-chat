import { components } from "../../_generated/api";
import { RAG } from "@convex-dev/rag";
import {google} from '@ai-sdk/google'
const model = google.textEmbedding('gemini-embedding-001');

export const rag = new RAG(components.rag,{
      textEmbeddingModel:model,
    embeddingDimension:	3072
})