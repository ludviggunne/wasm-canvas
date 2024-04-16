#define SIZE 256

unsigned char image[SIZE * SIZE * 4];

void *getImage(void)
{
    return image;
}

int getImageWidth(void)
{
    return SIZE;
}

int getImageHeight(void)
{
    return SIZE;
}

void drawImage(void)
{
    for (int y = 0; y < SIZE; y++) {
        for (int x = 0; x < SIZE; x++) {
            image[4 * (x + SIZE * y) + 0] = x ^ y;
            image[4 * (x + SIZE * y) + 1] = x | y;
            image[4 * (x + SIZE * y) + 2] = x & y;
            image[4 * (x + SIZE * y) + 3] = 255;
        }
    }
}
