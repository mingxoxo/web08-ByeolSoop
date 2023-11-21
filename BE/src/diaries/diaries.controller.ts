import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { DiariesService } from "./diaries.service";
import {
  CreateDiaryDto,
  DeleteDiaryDto,
  ReadDiaryDto,
  UpdateDiaryDto,
} from "./diaries.dto";
import { Diary } from "./diaries.entity";
import { AuthGuard } from "@nestjs/passport";
import { IdGuard } from "src/auth/auth.id-guard";

@Controller("diaries")
@UseGuards(AuthGuard())
export class DiariesController {
  constructor(private diariesService: DiariesService) {}

  @Post()
  @HttpCode(201)
  async writeDiary(@Body() createDiaryDto: CreateDiaryDto): Promise<string> {
    const diary: Diary = await this.diariesService.writeDiary(createDiaryDto);
    const response = JSON.stringify({
      uuid: diary.uuid,
    });
    return response;
  }

  @Get("/:uuid")
  @UseGuards(IdGuard)
  async readDiary(@Param("uuid") uuid: string): Promise<String> {
    const readDiaryDto: ReadDiaryDto = { uuid };
    const diary = await this.diariesService.readDiary(readDiaryDto);

    const response = JSON.stringify({
      userId: diary.user.userId,
      title: diary.title,
      content: diary.content,
      date: diary.date,
      tags: [],
      emotion: {
        positive: diary.positiveRatio,
        neutral: diary.neutralRatio,
        negative: diary.negativeRatio,
        sentiment: diary.sentiment,
      },
      coordinate: {
        x: diary.point.split(",")[0],
        y: diary.point.split(",")[1],
        z: diary.point.split(",")[2],
      },
      shape_uuid: diary.shape.uuid,
    });

    return response;
  }

  @Put()
  @UseGuards(IdGuard)
  modifyDiary(@Body() updateDiaryDto: UpdateDiaryDto): Promise<Diary> {
    return this.diariesService.modifyDiary(updateDiaryDto);
  }

  @Delete("/:uuid")
  @UseGuards(IdGuard)
  deleteBoard(@Param("uuid") uuid: string): Promise<void> {
    const deleteDiaryDto: DeleteDiaryDto = { uuid };
    return this.diariesService.deleteDiary(deleteDiaryDto);
  }
}
