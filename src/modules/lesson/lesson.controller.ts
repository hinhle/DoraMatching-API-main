import { FindOneParams, IPagination, PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { IClasseRO } from '@classe/dto';
import { CreateLessonDTO, ILessonRO } from '@lesson/dto';
import { LessonService } from '@lesson/lesson.service';
import { TimeRangeQuery } from '@lesson/time-range.params';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('lesson')
@Controller()
export class LessonController {
    constructor(
      private readonly lessonService: LessonService,
    ) {
    }

    @Auth()
    @Post('classe/:id/lesson')
    createLessonByClasseId(@Param() { id }: FindOneParams, @Body() data: CreateLessonDTO, @User() jwtUser: JwtUser): Promise<IClasseRO> {
        return this.lessonService.createLessonByClasseId(id, data, jwtUser);
    }

    @Auth()
    @Get('classe/:id/lessons')
    getAllLessonByClasseId(@Param() { id }: FindOneParams, @Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser): Promise<IPagination<ILessonRO>> {
        return this.lessonService.getAllLessonsByClasseId(id, pagOpts, jwtUser);
    }

    @Auth()
    @Get('lesson/:id')
    getLessonById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser) {
        return this.lessonService.getLessonById(id, jwtUser);
    }

    @Auth()
    @Patch('lesson/:id')
    updateLessonById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser) {

    }

    @Auth()
    @Delete('lesson/:id')
    deleteLessonById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser) {

    }

    @Auth()
    @Get('trainer/:id/lessons')
    getTrainerLessons(@Param() { id }: FindOneParams, @Query() timeRange: TimeRangeQuery, @User() jwtUser: JwtUser) {
        return this.lessonService.getTrainerLessons(id, timeRange, jwtUser);
    }
}
