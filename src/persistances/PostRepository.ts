import * as knex from "knex"
import {RequestBodyPost, RequestBodyDefault} from "models/Post"

import {ResponseGetPost} from '../generated/types/ResponseGetPost'

export class PostRepository {
  constructor(private knex: knex) {}

  getAll = (): Promise<Array<ResponseGetPost>> => this.knex.select("post", "likes", "comment").from('blog').then((results): ResponseGetPost[] => results.map((r) => ({post: r.post, likes: r.likes, comment: r.comment})));

  delete = (postIdToDelete: number) => this.knex('blog').where('id', postIdToDelete).del()

  createOne = (requestBody: RequestBodyPost) => this.knex('blog').insert({ post: requestBody.post, likes: requestBody.likes, comment: requestBody.comment })

  updateOne = (requestParamsId: number, requestBody: RequestBodyDefault, keyDecoded: string) => this.knex('blog').where('id', requestParamsId).update({[keyDecoded]: requestBody[keyDecoded]})

}
