/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from "@void-snippets/core";
import { Response } from "../apiLayer.type";
import { Office } from "../office-module/office.types";

export namespace Holiday {
  export type Id = VSId<string, "Holiday">;

  export interface Base {
    _id: Id;
    title: string;
    holidayDate: string;
    year: number;
    description: string;
    officeId: Office.Id;
    isNationalHoliday: boolean;
    createdAt: string;
    updatedAt: string;
  }
  export type Detail = Omit<Base, "officeId"> & {
    officeId: Office.Detail;
  };

  export type List = Detail[];

  export namespace Apis {
    export interface Create {
      title: string;
      description: string;
      holidayDate: Date;
      year: string;
      isNationalHoliday: string;
      officeId: string | undefined;
    }

    export type CreateResponse = Response.Normal<Detail>;
    export type GetResponse = Response.Normal<Detail>;
    export type DeleteResponse = Response.Normal<null>;
    export type ListResponse = Response.Paginated<Detail>;
  }
}
