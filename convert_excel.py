import openpyxl
import json
import os

def extract_data():
    file_path = r'd:\外贸客户全自动开发\JUNHAI分销.xlsx'
    output_path = r'd:\外贸客户全自动开发\products_data.json'
    
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    wb = openpyxl.load_workbook(file_path, data_only=True)
    all_products = []

    for sheet_name in wb.sheetnames:
        sheet = wb[sheet_name]
        rows = list(sheet.rows)
        if not rows:
            continue
            
        header_row_index = -1
        for i, row in enumerate(rows[:10]):
            values = [str(cell.value).strip() if cell.value else "" for cell in row]
            if "品名" in values:
                header_row_index = i
                break
        
        if header_row_index == -1:
            continue

        raw_headers = [str(cell.value).strip() if cell.value else f"Column_{i}" for i, cell in enumerate(rows[header_row_index])]
        
        for row in rows[header_row_index + 1:]:
            row_values = [cell.value for cell in row]
            if not any(row_values):
                continue
                
            raw_product = {raw_headers[i]: (row_values[i].strip() if isinstance(row_values[i], str) else row_values[i]) for i in range(min(len(raw_headers), len(row_values)))}
            
            if not raw_product.get("品名"):
                continue

            # Clean and map to standard fields
            product = {
                "产品名称": raw_product.get("品名"),
                "分类": sheet_name,
                "价格": raw_product.get("批发\n（不带赠品）\n【裸货价】") or raw_product.get("批发（不含赠品）裸箱") or raw_product.get("批发价（裸货价格）"),
                "MOQ": raw_product.get("起批数量"),
                "描述": raw_product.get("功能/特点") or raw_product.get("特点") or raw_product.get("功能描述"),
                "尺寸": raw_product.get("产品尺寸") or raw_product.get("尺寸"),
                "重量": raw_product.get("重量"),
                "赠品/备注": raw_product.get("赠品") or raw_product.get("备注")
            }
            
            # Map extra fields or keep raw if needed
            all_products.append(product)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_products, f, ensure_ascii=False, indent=4)
        
    print(f"Total products extracted: {len(all_products)}")
    print("First 3 products:")
    print(json.dumps(all_products[:3], ensure_ascii=False, indent=4))

if __name__ == '__main__':
    extract_data()

