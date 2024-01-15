// user.model.ts
import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { UserRoleEnum } from '../enum/userRole.enum';
import { Exclude } from 'class-transformer';

@Table({tableName: 'users'})
export class UserEntity extends Model<UserEntity> {
    @Column({
        type: DataType.UUID,
        allowNull:false,
        primaryKey: true,
    })
        id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
        email: string;

    @Exclude()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        password: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRoleEnum)),
        allowNull: false,
    })
        role: UserRoleEnum;
}
