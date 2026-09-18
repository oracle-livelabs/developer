import sys

import oracledb

from app import TABLE_NAME, _get_connection


def _table_exists(cur):
    cur.execute(
        """
        SELECT COUNT(*)
        FROM user_tables
        WHERE table_name = :table_name
        """,
        table_name=TABLE_NAME,
    )
    return cur.fetchone()[0] == 1


def main():
    with _get_connection() as conn:
        with conn.cursor() as cur:
            if not _table_exists(cur):
                print(f"No cleanup needed. Table {TABLE_NAME} does not exist.")
                return 0

            cur.execute(f"SELECT COUNT(*) FROM {TABLE_NAME}")
            row_count = cur.fetchone()[0]

            try:
                cur.execute(f"DROP TABLE {TABLE_NAME} PURGE")
            except oracledb.DatabaseError as exc:
                error_obj = exc.args[0]
                if getattr(error_obj, "code", None) == 942:
                    print(f"No cleanup needed. Table {TABLE_NAME} does not exist.")
                    return 0
                raise

        conn.commit()

    print(f"Dropped table {TABLE_NAME}. Removed {row_count} rows.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
