import { Body, Controller, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos";
import { ApiBody, ApiTags } from "@nestjs/swagger";



@ApiTags('Category')
@Controller({
  path: 'category',
  version: '1.0'
})
export class CategoryController {
  #_service: CategoryService;

  constructor(service: CategoryService){
    this.#_service = service
  }

  @ApiBody({
    type: CreateCategoryDto
  })
  @Post()
  async createCategory(@Body() payload: CreateCategoryDto): Promise<void>{
    await this.#_service.createCategory(payload)
  }
}