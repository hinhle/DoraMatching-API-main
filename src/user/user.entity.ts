import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, UpdateDateColumn, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from '@/shared/config';
import { UserRO } from './user.dto';
import { AppRoles } from '../app.roles';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true, unique: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    avatarUrl: string;

    @Column({ type: 'text', default: 'Dora User' })
    name: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column('text')
    password: string;

    @Column({ type: 'simple-array', default: AppRoles.TRAINEE })
    roles: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken = true): UserRO {
        const { id, createdAt, username, token, roles, email, avatarUrl } = this;
        const responseObject: UserRO = { id, createdAt, username, email, roles, avatarUrl };
        if (showToken) {
            responseObject.token = token;
        }

        return responseObject;
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const { id, username } = this;
        const { jwtSecretKey, jwtExpiresIn } = config;
        return jwt.sign(
            { id, username },
            jwtSecretKey,
            { expiresIn: jwtExpiresIn });
    }
}
