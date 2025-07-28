import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Project, ProjectStatus } from '../../entity/projects.entity';
import { Not, Repository } from 'typeorm';
import { ProjectDto } from './dto/projects.dto';
import { ProjectMember } from 'src/entity/project-member.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
    @Inject('PROJECT_MEMBER_REPOSITORY')
    private projectMemberRepository: Repository<ProjectMember>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['employee', 'members', 'tasks'],
    });
  }

  async create(
    createProjectDto: ProjectDto,
    projectMembers: any[],
  ): Promise<Project> {
    const newProject = await this.projectRepository.save(
      this.projectRepository.create({
        ...createProjectDto,
        employee: { id: createProjectDto.owner_id },
      }),
    );
    if (projectMembers && projectMembers.length > 0) {
      await Promise.all(
        projectMembers.map(async (item) => {
          await this.projectMemberRepository.save(
            this.projectMemberRepository.create({
              project: { id: newProject.id },
              employee: { id: item.employee_id },
              role_in_project: item.role_in_project,
            }),
          );
        }),
      );
    }

    const fullData = await this.projectRepository.findOne({
      where: { id: newProject.id },
      relations: ['employee', 'members', 'tasks'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy phiếu vừa tạo.');
    }

    return fullData;
  }
  async update(updateDto: ProjectDto, projectMembers: any[]): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: updateDto.id },
    });

    if (!project) {
      throw new NotFoundException('Không tìm thấy dự án này!!');
    }

    await this.projectRepository.save({
      ...project,
      ...updateDto,
      employee: { id: updateDto.owner_id },
    });

    await this.projectMemberRepository.delete({
      project_id: updateDto.id,
    });

    if (Array.isArray(projectMembers) && projectMembers.length > 0) {
      await Promise.all(
        projectMembers
          .filter((item) => item?.employee_id)
          .map((item) =>
            this.projectMemberRepository.save(
              this.projectMemberRepository.create({
                project: { id: updateDto.id },
                employee: { id: item.employee_id },
                role_in_project: item.role_in_project,
              }),
            ),
          ),
      );
    }

    const fullData = await this.projectRepository.findOne({
      where: { id: updateDto.id },
      relations: ['employee', 'members', 'tasks'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy dự án cập nhật.');
    }

    return fullData;
  }

  async remove(id: number): Promise<Project> {
    if (!id) {
      throw new BadRequestException('Thiếu ID dự án!');
    }
    const Project = await this.projectRepository.findOne({
      where: { id: id },
    });
    if (!Project) {
      throw new NotFoundException('Không tìm thấy dự án!');
    }
    Project.status = ProjectStatus.REMOVE;
    return await this.projectRepository.save(Project);
  }
}
