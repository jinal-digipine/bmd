/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from "@void-snippets/core";
import type { Response } from "../apiLayer.type";

export namespace State {
  export type Id = VSId<string, "State">;

  export interface Base {
    _id: Id;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

  export type Detail = Base;

  export type List = Detail[];

  export namespace Apis {
    export interface Create {
      name: string;
    }

    export type CreateResponse = Response.Normal<Detail>;
    export type GetResponse = Response.Normal<Detail>;
    export type DeleteResponse = Response.Normal<null>;
    export type ListResponse = Response.Paginated<Detail>;
  }
}
