import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AnttCacheService } from "./antt-cache.service";
import { CreateAnttCacheDto } from "dto/request/create-antt-cache.dto";
import {
  ANTT_CACHE_RECORD_CREATED_OR_UPDATED,
  ANTT_CACHE_RECORD_DELETED,
  ANTT_CACHE_RECORD_NOT_CREATED,
  VIOLATION_UNIQUE_KEY_ERROR,
} from "src/constants";
import { AuthGuard } from "@nestjs/passport";

@Controller("antt-cache")
export class AnttCacheController {
  constructor(private readonly anttCacheService: AnttCacheService) {}

  @Post()
  @UseGuards(AuthGuard("api-key"))
  async createOrUpdateAnttCache(
    @Res() response,
    @Body() createAnttCacheDto: CreateAnttCacheDto
  ) {
    try {
      const createdAnttCache =
        await this.anttCacheService.createOrUpdateAnttCache(createAnttCacheDto);
      return response.status(HttpStatus.CREATED).json({
        message: ANTT_CACHE_RECORD_CREATED_OR_UPDATED,
        createdAnttCache,
      });
    } catch (err) {
      console.log(err);

      let errorMessage = "Internal Error";
      if (err.code === 11000) errorMessage = VIOLATION_UNIQUE_KEY_ERROR;

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: ANTT_CACHE_RECORD_NOT_CREATED,
        error: errorMessage,
      });
    }
  }

  @Get()
  @UseGuards(AuthGuard("api-key"))
  async getAnttCaches(
    @Res() response,
    @Query("licensePlate") licensePlate?,
    @Query("carrierTaxId") carrierTaxId?,
    @Query("carrierRntrc") carrierRntrc?
  ) {
    try {
      const anttCacheData =
        licensePlate || carrierTaxId || carrierRntrc
          ? await this.anttCacheService.getAnttCacheByFields(
              licensePlate,
              carrierTaxId,
              carrierRntrc
            )
          : await this.anttCacheService.getAllAnttCache();

      return response.status(HttpStatus.OK).json(anttCacheData);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get("/:id")
  @UseGuards(AuthGuard("api-key"))
  async getAnttCache(@Res() response, @Param("id") anttCacheId: string) {
    try {
      const existingAnttCache =
        await this.anttCacheService.getAnttCache(anttCacheId);
      return response.status(HttpStatus.OK).json(existingAnttCache);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("api-key"))
  async deleteAnttCache(@Res() response, @Param("id") anttCacheId: string) {
    try {
      const deletedAnttCache =
        await this.anttCacheService.deleteAnttCache(anttCacheId);
      return response.status(HttpStatus.OK).json({
        message: ANTT_CACHE_RECORD_DELETED,
        deletedAnttCache,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
