// user.model.ts
import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        password: string;
}
