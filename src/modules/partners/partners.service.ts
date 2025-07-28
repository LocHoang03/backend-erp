import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Partner } from './../../entity/partners.entity';
import { Not, Repository } from 'typeorm';
import { PartnerDto } from './dto/partners.dto';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';

@Injectable()
export class PartnerService {
  constructor(
    @Inject('PARTNER_REPOSITORY')
    private PartnerRepository: Repository<Partner>,
  ) {}

  async findAll(): Promise<Partner[]> {
    return this.PartnerRepository.find({
      where: {
        is_active: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createPartnerDto: PartnerDto): Promise<Partner> {
    const exists = await this.PartnerRepository.findOne({
      where: [
        { email: createPartnerDto.email },
        { phone: createPartnerDto.phone },
        { tax_code: createPartnerDto.tax_code },
      ],
    });

    if (exists) {
      throw new BadRequestException(
        'Thông tin trùng (email | số điện thoại | mã số thuế)!!!',
      );
    }

    return this.PartnerRepository.save(
      this.PartnerRepository.create(createPartnerDto),
    );
  }

  async update(updateDto: PartnerDto): Promise<Partner> {
    const conflict = await this.PartnerRepository.findOne({
      where: [
        { email: updateDto.email },
        { phone: updateDto.phone },
        { tax_code: updateDto.tax_code },
      ],
    });

    if (conflict && conflict.id !== updateDto.id) {
      throw new BadRequestException(
        'Thông tin trùng (email | số điện thoại | mã số thuế)!!!',
      );
    }

    return await this.PartnerRepository.save({
      ...Partner,
      ...updateDto,
      tax_code: updateDto.tax_code ? updateDto.tax_code : undefined,
    });
  }

  async delete(id: number): Promise<Partner> {
    if (!id) {
      throw new BadRequestException('Thiếu ID đối tác!!');
    }
    const Partner = await this.PartnerRepository.findOne({
      where: { id: id },
    });
    if (!Partner) {
      throw new NotFoundException('Không tìm thấy đối tác!!');
    }
    Partner['is_active'] = false;
    return await this.PartnerRepository.save(Partner);
  }
}
