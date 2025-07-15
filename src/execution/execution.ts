import 'dotenv/config';
import { makeSummary } from 'src/core/summary-maker/summary-maker';
import houses from 'src/data/houses.json';

makeSummary(houses);
