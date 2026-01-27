import { QueryTypes } from "sequelize";
import { getSequelize } from "../database/sequelize";

type IdRow = {
  id: string;
};

export async function seedSuperAdmin() {
  const sequelize = getSequelize();

  // 1. Get SUPER_ADMIN role
  const roles = await sequelize.query<IdRow>(
    `SELECT id FROM roles WHERE name = 'SUPER_ADMIN' LIMIT 1`,
    { type: QueryTypes.SELECT }
  );

  const role = roles[0];

  if (!role) {
    throw new Error("SUPER_ADMIN role not found");
  }

  // 2. Get all permissions
  const permissions = await sequelize.query<IdRow>(
    `SELECT id FROM permissions`,
    { type: QueryTypes.SELECT }
  );

  // 3. Assign all permissions to SUPER_ADMIN
  for (const permission of permissions) {
    await sequelize.query(
      `
      INSERT INTO role_permissions (role_id, permission_id)
      VALUES (:roleId, :permissionId)
      ON CONFLICT DO NOTHING
      `,
      {
        replacements: {
          roleId: role.id,
          permissionId: permission.id,
        },
        type: QueryTypes.INSERT,
      }
    );
  }
}
