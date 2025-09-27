import multer from 'multer';
import xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() }); // store file in memory
